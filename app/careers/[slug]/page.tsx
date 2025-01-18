import HeaderSecondary from "@/components/Header/Secondary";
import SectionHeroSmall from "@/components/Common/SectionHeroSmall";
import CareerItem from "@/components/Career/CareerItem";
import Footer from "@/components/Footer";
import { fetchAPI } from "@/lib/utils";

interface JobDescriptionChild {
  text: string;
  children?: { text: string }[];
}

interface JobDescription {
  type: string;
  level?: number;
  children: JobDescriptionChild[];
  image?: {
    url: string;
    alternativeText?: string;
  };
}

interface Job {
  Title: string;
  Location: string;
  Description: JobDescription[];
  Slug: string;
}

// Fonction pour récupérer les données côté serveur
async function getJobData(slug: string): Promise<Job | null> {
  const response = await fetchAPI(
    `/api/careers?filters[Slug][$eq]=${slug}&populate=*`
  );
  if (response?.data?.length > 0) {
    const fetchedJob = response.data[0];
    return {
      Title: fetchedJob.Title,
      Location: fetchedJob.Location,
      Description: fetchedJob.Description,
      Slug: fetchedJob.Slug,
    };
  }
  return null;
}

// Composant pour afficher la page carrière
export default async function CareerIdPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params; // Attendre la résolution de params
  const job = await getJobData(slug);

  return (
    <>
      <HeaderSecondary />
      <SectionHeroSmall />
      {job ? <CareerItem job={job} /> : <p>Job not found</p>}
      <Footer />
    </>
  );
}
