/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuasar } from "quasar";
import { api } from "boot/axios";
import type { authStateInterface } from "src/modules/auth/store/auth-store-interfaces";

export const useSlackService = () => {
  const slackBaseURL = import.meta.env.VITE_API_BASE_URL || "";

  const $q = useQuasar();

  const sendSlackErrorMessage = async (error: any, payload?: any) => {
    const authState: authStateInterface | null = $q.localStorage.getItem('authState');

    // Axios errors are circular, so send only the fields the API needs
    const errorInfo = {
      status: error?.status ?? error?.response?.status,
      message: error?.message,
      config: { method: error?.config?.method, url: error?.config?.url },
      response: { status: error?.response?.status, data: error?.response?.data },
    };

    try {
      await api.post(`${slackBaseURL}/slack/error`, {
        error: errorInfo,
        payload,
        authState,
        page: window.location.pathname,
      });
    } catch (slackError) {
      console.error('Error sending message to Slack:', slackError);
    }
  };

  return {
    sendSlackErrorMessage
  }

}
