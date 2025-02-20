# Projet_L3 : Moteur de recherche pour des formations de santé  ( NGUYEN Duc Duong, Hichame Papa )
# Configuration pour le projet :
- D'abord , on doit installer " npm install"
- on doit configurer le xampp et le phpMySQL, allumer les deux et faire la base de données, créer un db_formation avec des tables ( formations, users, comments)
- Pour marcher le backend: par example: "C:\LICENCE 3\SS6\PROJET\Projet_L3\backend\npm start"
- Pour marcher le frontend: par example: "C:\LICENCE 3\SS6\PROJET\Projet_L3\backend\npm run serve"
- pour marcher l'elasticsearch, installer le docker après marcher "docker compose up", importer des données de MySQL à l'elastic ( utiliser le kibana pour gérer l'elastic) 

# Démo le site:
# Page d'accueil
![image](https://github-production-user-asset-6210df.s3.amazonaws.com/90606347/244882076-9a7c6aed-5946-4e4f-8d9d-8783f5fe393b.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20250220%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250220T134955Z&X-Amz-Expires=300&X-Amz-Signature=9cb17b5a0e938e3418aa2cd2b59fb655bd53da1cf36fe4cdfef620b7cadb74be&X-Amz-SignedHeaders=host)

![image](https://github-production-user-asset-6210df.s3.amazonaws.com/90606347/244882178-5e023047-e932-4e77-bf79-ccb9575b35ac.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20250220%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250220T135045Z&X-Amz-Expires=300&X-Amz-Signature=ec1c38cdfe86498f3a5259cb088f31957cf68ae6f66b4b0fdcc980ade8b87454&X-Amz-SignedHeaders=host)

# Page de détail d'une formation
![image](https://github-production-user-asset-6210df.s3.amazonaws.com/90606347/244882211-6070f0eb-38b2-43fe-ba68-360da07033e7.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20250220%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250220T133647Z&X-Amz-Expires=300&X-Amz-Signature=e5eb120d0b0a5b9ff0d03012bf4d8295035cadb457e6ea5e1eb1dd5ab5b0aefd&X-Amz-SignedHeaders=host)

# Page d'admin pour gérer le site (des utilisateurs et des formations)
![image](https://github-production-user-asset-6210df.s3.amazonaws.com/90606347/243823246-3607ad7e-c693-4458-9fc6-80e4ef861d0d.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20250220%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250220T133705Z&X-Amz-Expires=300&X-Amz-Signature=c17082b48754c68a6eb816317f56ea858e5a7c22502306200dde0d0aec12c952&X-Amz-SignedHeaders=host)

![image](https://github-production-user-asset-6210df.s3.amazonaws.com/90606347/244879342-ba8bca08-f871-4467-be72-cf2c45053c68.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20250220%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250220T133743Z&X-Amz-Expires=300&X-Amz-Signature=e5712b3b0e497b3d954b7fa974bbc4a0701520f549015fd8f1854c06218e6f35&X-Amz-SignedHeaders=host)

![image](https://github-production-user-asset-6210df.s3.amazonaws.com/90606347/243822939-72db2543-1920-4218-bccc-85f69be9cdd7.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20250220%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250220T133836Z&X-Amz-Expires=300&X-Amz-Signature=28a057b0564e6ca0ace39ea887eb43ce082a2a44ea70dafc6dd272c8ad20a08b&X-Amz-SignedHeaders=host)

![image](https://github-production-user-asset-6210df.s3.amazonaws.com/90606347/243823391-971d16b3-dfda-4f95-bd50-a7ef6a9499ab.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20250220%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250220T133851Z&X-Amz-Expires=300&X-Amz-Signature=02bc106d5a0f6c4c81596b5b9757069fd0cf5ecccf0c4f92cd64d25037e6ccd6&X-Amz-SignedHeaders=host)

![image](https://github-production-user-asset-6210df.s3.amazonaws.com/90606347/243823547-acda359f-d1ea-4d02-a676-798558170bba.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20250220%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250220T133906Z&X-Amz-Expires=300&X-Amz-Signature=6edd8f9c5e86c08b72cc20cf1ab5bcb392644c64dbb5c27ce2ef361514f4b329&X-Amz-SignedHeaders=host)

# Page de formateur
![image](https://github-production-user-asset-6210df.s3.amazonaws.com/90606347/244882939-e23fc01f-2600-4835-97bf-220849d610d9.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20250220%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250220T133923Z&X-Amz-Expires=300&X-Amz-Signature=d7b9aae887dd3cead132ea3a34158286d0a48db009800fa53864c81b1d569011&X-Amz-SignedHeaders=host)

# le moteur de recherche
![image](https://github-production-user-asset-6210df.s3.amazonaws.com/90606347/243823790-514ee3a0-5c7c-4149-845d-8f0705ae455c.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20250220%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250220T134011Z&X-Amz-Expires=300&X-Amz-Signature=f8a68804e1420b66e01163463d8d45fcd22f7cd9a266c249898d0a080f0a84ea&X-Amz-SignedHeaders=host)
![image](https://github-production-user-asset-6210df.s3.amazonaws.com/90606347/244882561-04bdf165-e1af-4606-afb0-f47f040cd413.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20250220%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250220T134029Z&X-Amz-Expires=300&X-Amz-Signature=2207f9173bfebd030570648537356c49019572d0793d2616ad13fa670ffa49ae&X-Amz-SignedHeaders=host)


# Page de la connexion
![image](https://github-production-user-asset-6210df.s3.amazonaws.com/90606347/244882511-3b5f5389-1563-4458-bced-46bfa6d174d0.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20250220%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250220T134040Z&X-Amz-Expires=300&X-Amz-Signature=a5694e5a28c584135392ae2110d53a87f64126483176224edac517fc795d9256&X-Amz-SignedHeaders=host)

# Page de l'incription

![image](https://github-production-user-asset-6210df.s3.amazonaws.com/90606347/244882531-3f317369-ca00-4a88-829a-f665752152e1.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20250220%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250220T134054Z&X-Amz-Expires=300&X-Amz-Signature=ceace26ea9ddc660cc0b751e2d9338b61c4a752ed1c9a207f007640bf227b94f&X-Amz-SignedHeaders=host)
