// InviteFF.tsx
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

interface InviteFFProps {
  inviteData: Invite | null;
}

export default function InviteFF({ inviteData }: InviteFFProps) {
  return inviteData ? <SectionInvite inviteData={inviteData} /> : null;
}
