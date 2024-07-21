import ProfileHeader from "@/components/ProfileHeader";
import { auth } from "@/firebase.config";
import styles from "@/modules/MeetChat/meetChat.module.scss";
import { ArrowDropDown } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { useRouter } from "next/router";

const UserInfo = () => {
  const router = useRouter();
  return (
    <div className={styles.userInfoContainer}>
      <ProfileHeader />
      <Accordion className={styles.Accordion} defaultExpanded>
        <AccordionSummary
          expandIcon={<ArrowDropDown />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <span>Information</span>
        </AccordionSummary>

        <AccordionDetails
          sx={{ borderTop: "1px solid rgba(245, 245, 245, 0.253)" }}
        >
          <div>
            <span>Email: </span>
            <span>{auth?.currentUser?.email}</span>
          </div>
          <div>
            <span>Room Id: </span>
            <span>{router?.query?.["room-id"]}</span>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default UserInfo;
