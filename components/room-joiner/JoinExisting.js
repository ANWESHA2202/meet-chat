import { Button, CircularProgress, TextField } from "@mui/material";
import styles from "@/modules/MeetChat/meetChat.module.scss";
import { SendRounded } from "@mui/icons-material";
import { useState } from "react";
import { useJoinRoom } from "../hooks/useJoinRoom";

const JoinExisting = () => {
  const [inputRoomId, setInputRoomId] = useState("");
  const [inputError, setInputError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const joinRoomMutation = useJoinRoom(setInputError, setIsLoading);

  //handler functions
  const handleOnChange = (value = "") => {
    let val = value;
    if (val.length < inputRoomId.length) {
      setInputRoomId(val);
    } else {
      if (val?.length === 4 || val?.length === 9) {
        val = `${val?.slice(0, val.length - 1)}-${val[val.length - 1]}`;
      }
    }
    if (val?.length > 12) setInputError("invalid room-id");
    else if (val?.length === 12) setInputError("");
    setInputRoomId(val);
  };

  const handleJoinRoom = () => {
    if (inputRoomId?.length !== 12) {
      setInputError("Invalid room-id");
      return;
    }

    joinRoomMutation.mutate(inputRoomId);
  };

  return (
    <div className={styles.joinExisting}>
      <TextField
        placeholder="Type a room-id"
        className={styles.inputField}
        value={inputRoomId}
        onChange={(e) => handleOnChange(e.target.value)}
        onBlur={() =>
          inputRoomId?.length !== 12
            ? setInputError("invalid room-id")
            : setInputError("")
        }
        onKeyDown={(e) => e.key === "Enter" && handleJoinRoom()}
        InputProps={{
          endAdornment: (
            <Button
              variant="contained"
              sx={{ padding: "auto 10px" }}
              disabled={inputError?.length > 0 || isLoading}
              endIcon={!isLoading && <SendRounded />}
              onClick={() => handleJoinRoom()}
            >
              {!isLoading ? (
                "Join"
              ) : (
                <CircularProgress sx={{ width: "20px" }} />
              )}
            </Button>
          ),
        }}
      />
      <p style={{ color: "crimson", padding: "2px 5px" }}>{inputError}</p>
    </div>
  );
};

export default JoinExisting;
