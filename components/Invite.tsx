import SectionInvite from "@/components/Common/SectionInvite";

interface Invite {
  Title: string;
  Paragraph: string;
  ButtonText: string;
  ButtonLink: string | null;
  Image: {
    url: string;
  };
}

interface InviteProps {
  inviteData: Invite | null;
}

export default function Invite({ inviteData }: InviteProps) {
  return inviteData ? <SectionInvite inviteData={inviteData} /> : null;
}
