import { KeycloakService } from 'keycloak-angular';
 
export function initializeKeycloak(keycloak: KeycloakService): () => Promise<any> {
  return (): Promise<any> => {
      return keycloak
        .init({
          config: {
            url: 'http://localhost:8080',
            realm: 'keycloak',
            clientId: 'test',
          },
          initOptions: {
            onLoad: 'check-sso',
            checkLoginIframe: true,
          },
         
          bearerExcludedUrls: [],
        })
     
  };
}