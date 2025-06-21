import { useState } from "react";
import { SERVER_HOST } from "../../../shared/constants";
import { IUser } from "../../auth/types";

export function useRecipient() {
    const [recipient, setRecipient] = useState<IUser | null >(null);

    async function getRecipient(id: number) {
        try {
            const response = await fetch(`${SERVER_HOST}api/user/recipient`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id }),
            });

            const result = await response.json();
            setRecipient(result);
            return result;
        } catch (err) {
            console.error("Failed to fetch chats", err);
            return null;
        }
    }

    return { recipient, getRecipient };
}
