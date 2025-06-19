import { useState } from "react";
import { SERVER_HOST } from "../../../shared/constants";
import { Result, Success } from "../../../shared/types/result";
import { useUserContext } from "../context/userContext";




export function useChangePasswordPartOne() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { getToken } = useUserContext()


    async function changePasswordPartOne() {
        try {
            const token = await getToken()

            const response = await fetch(`${SERVER_HOST}api/user/change-password/one`, {
                method: "POST",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                // body: JSON.stringify({ password }),
            })

            const result: Result<string> = await response.json();

            if (result.status === "error") {
                setError(result.message);
                return result;
            }

            return result;
        } catch (error) {
            console.error("Ошибка в changePasswordPartOne:", error);
            setError("An unexpected error occurred");
            return { status: "error", message: "An unexpected error occurred" };
        }
    }


    return { changePasswordPartOne, loading, error };
}



export function useChangePasswordPartTwo() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { getToken } = useUserContext()

    async function changePasswordPartTwo(code: string, password: string) {
        try {
            const token = await getToken()
            const response = await fetch(`${SERVER_HOST}api/user/change-password/two`, {
                method: "POST",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                body: JSON.stringify({ code, password }),
            })

            const result: Result<string> = await response.json();

            if (result.status === "error") {
                setError(result.message);
                return result;
            }

            return result;
        } catch (error) {
            console.error("Ошибка в changePasswordPartOne:", error);
            setError("An unexpected error occurred");
            return { status: "error", message: "An unexpected error occurred" };
        }
    }

    return { changePasswordPartTwo, loading, error };
}