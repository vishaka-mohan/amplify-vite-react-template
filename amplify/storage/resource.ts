import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'gameDialogueAudios',
  access: (allow) => ({
    '/*': [
      allow.authenticated.to(['read','write']),
      allow.guest.to(['read', 'write'])
    ],
  })
});