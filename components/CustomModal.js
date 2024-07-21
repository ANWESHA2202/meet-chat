import React from "react";
import styled from "@emotion/styled";
import { Button, Modal, Box } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";

const StyledModalContent = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius:15px
  width: 400px;
  background-color: #fff;
  color:whitesmoke
  box-shadow: 24px;
  padding: 16px 32px 24px;
  outline: none;
`;

const CustomModal = ({ handleClose }) => {
  const queryClient = useQueryClient();

  return (
    <Modal
      open={queryClient?.getQueryData("isModalOpen")}
      onClose={handleClose}
      aria-labelledby="custom-modal-title"
      aria-describedby="custom-modal-description"
    >
      <StyledModalContent>
        <div>{queryClient?.getQueryData("modalText")}</div>
        <Button onClick={handleClose} variant="contained" sx={{ mt: 2 }}>
          Close
        </Button>
      </StyledModalContent>
    </Modal>
  );
};

export default CustomModal;
