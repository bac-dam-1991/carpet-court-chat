import { Paper, Button, Box } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useForm } from "react-hook-form";
import { PostMessageArgs, postMessage } from "../apis/messagesApis";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MessageOwner } from "./ChatBubble";
import { useRef } from "react";

export type MessageType = "text" | "image";

export interface Message {
  id: number;
  content: string;
  type: MessageType;
  owner: MessageOwner;
  widget?: string;
  reference?: string;
  nextAction?: "passthrough" | "wait";
}

export const MessageInput = () => {
  const { register, handleSubmit, reset } = useForm<{ message: string }>();
  const queryClient = useQueryClient();
  const messageIdRef = useRef<number>(0);

  const mutation = useMutation<Message, unknown, PostMessageArgs>({
    mutationFn: (payload) => postMessage(payload),
    onSuccess: (data) => {
      const isSystem = data.owner === "system";

      const messages = queryClient.getQueryData<Message[]>(["messages"]) || [];

      if (isSystem) {
        queryClient.setQueryData(["messages"], [...messages, data]);
      }

      if (data.nextAction === "passthrough") {
        const messages =
          queryClient.getQueryData<Message[]>(["messages"]) || [];

        const messageList = [...messages];
        messageIdRef.current = messageList.length;
        mutation.mutate({
          content: "",
          id: messageIdRef.current,
        });
      }
    },
  });

  const onSubmit = async ({ message }: { message: string }) => {
    reset();
    const messages = queryClient.getQueryData<Message[]>(["messages"]) || [];

    const payload: Message = {
      id: messageIdRef.current,
      content: message,
      type: "text",
      owner: "user",
    };

    const messageList = [...messages, payload];

    queryClient.setQueryData(["messages"], messageList);
    messageIdRef.current = messageList.length;
    mutation.mutate({
      content: message,
      id: messageIdRef.current,
    });
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ width: "100%", display: "flex", flexDirection: "row", gap: 2 }}
      >
        <Box
          component="input"
          sx={{ outline: "none", border: "none", fontSize: 14, flexGrow: 1 }}
          placeholder="Type your message here"
          autoFocus
          {...register("message")}
        />
        <Button
          variant="contained"
          type="submit"
          endIcon={<SendIcon />}
          sx={{ borderRadius: 36.5 / 2 }}
        >
          Send
        </Button>
      </Box>
    </Paper>
  );
};
