This is Backend-Repo submission for BE Task

1. Generate service key account in your firebase (https://console.firebase.google.com/)
2. Put the generated file in root folder with name serviceKeyAccount.json, example:
```
{
    "type": "service_account",
    "projectId": "",
    "privateKeyId": "",
    "privateKey": "",
    "clientEmail": "",
    "clientId": "",
    "authUri": "",
    "tokenUri": "",
    "auth_provider_x509_cert_url": "",
    "client_x509_cert_url": "",
    "universe_domain": ""
}
```
3. npm install
4. npm run dev

Improvement needs:
- somehow body parser and express parser for request body doesn't work