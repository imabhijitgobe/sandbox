"use client"

import * as React from "react"
import Image from "next/image"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport, type UIMessage } from "ai"

import { ChatComposer } from "@/components/chat-composer"
import { Bubble, BubbleContent } from "@/components/ui/bubble"
import {
  Message,
  MessageAvatar,
  MessageContent,
} from "@/components/ui/message"
import {
  MessageScroller,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/components/ui/message-scroller"

function getMessageText(message: UIMessage): string {
  return message.parts
    .filter((part) => part.type === "text")
    .map((part) => part.text)
    .join("")
}

export function ChatThread({
  gameId,
  initialMessages,
}: {
  gameId: string
  initialMessages: UIMessage[]
}) {
  const [draft, setDraft] = React.useState("")
  const [transport] = React.useState(
    () => new DefaultChatTransport({ api: "/api/chat", body: { gameId } })
  )

  const {
    messages,
    sendMessage,
    status,
    error,
    stop,
    regenerate,
    clearError,
  } = useChat({ id: gameId, transport, messages: initialMessages })

  const isLoading = status === "submitted" || status === "streaming"

  async function handleSubmit(value: string) {
    const trimmed = value.trim()
    if (!trimmed || isLoading) {
      return
    }
    if (error) {
      clearError()
    }
    await sendMessage({ text: trimmed })
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-4">
      <MessageScrollerProvider>
        <MessageScroller className="min-h-0 flex-1">
          <MessageScrollerViewport>
            <MessageScrollerContent>
              {messages.length === 0 && !isLoading && (
                <p className="text-sm text-muted-foreground">
                  Start the conversation by describing what to build next.
                </p>
              )}
              {messages.map((message) => {
                const text = getMessageText(message)
                if (!text) {
                  return null
                }
                return (
                  <MessageScrollerItem key={message.id}>
                    <Message align={message.role === "user" ? "end" : "start"}>
                      {message.role === "assistant" && (
                        <MessageAvatar>
                          <Image
                            src="/logo.svg"
                            alt="Sandbox"
                            width={20}
                            height={20}
                          />
                        </MessageAvatar>
                      )}
                      <MessageContent>
                        <Bubble
                          variant={
                            message.role === "user" ? "secondary" : "ghost"
                          }
                          align={message.role === "user" ? "end" : "start"}
                        >
                          <BubbleContent>{text}</BubbleContent>
                        </Bubble>
                      </MessageContent>
                    </Message>
                  </MessageScrollerItem>
                )
              })}
              {status === "submitted" && (
                <MessageScrollerItem>
                  <Message align="start">
                    <MessageAvatar>
                      <Image
                        src="/logo.svg"
                        alt="Sandbox"
                        width={20}
                        height={20}
                      />
                    </MessageAvatar>
                    <MessageContent>
                      <Bubble variant="ghost" align="start">
                        <BubbleContent>
                          <span className="animate-pulse">Thinking…</span>
                        </BubbleContent>
                      </Bubble>
                    </MessageContent>
                  </Message>
                </MessageScrollerItem>
              )}
              {error && (
                <MessageScrollerItem>
                  <Message align="start">
                    <MessageContent>
                      <Bubble variant="destructive" align="start">
                        <BubbleContent>
                          Something went wrong: {error.message}{" "}
                          <button
                            type="button"
                            className="underline underline-offset-2"
                            onClick={() => regenerate()}
                          >
                            Retry
                          </button>
                        </BubbleContent>
                      </Bubble>
                    </MessageContent>
                  </Message>
                </MessageScrollerItem>
              )}
            </MessageScrollerContent>
          </MessageScrollerViewport>
        </MessageScroller>
      </MessageScrollerProvider>
      {isLoading && (
        <button
          type="button"
          className="self-center text-xs text-muted-foreground underline underline-offset-2"
          onClick={() => stop()}
        >
          Stop generating
        </button>
      )}
      <ChatComposer
        value={draft}
        onValueChange={setDraft}
        onSubmit={handleSubmit}
        disabled={isLoading}
      />
    </div>
  )
}
