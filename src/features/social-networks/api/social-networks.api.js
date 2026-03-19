import http from "@/shared/api/http";

export const socialNetworksAPI = {
  checkSubscription: (telegramUserId) =>
    http.get(
      `/api/social-networks/check-subscription?telegramUserId=${telegramUserId}`
    ),
};
