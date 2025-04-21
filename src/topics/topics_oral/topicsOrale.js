const topicsOrale = [
    {
        id: 2,
        ad: `Stage de Cuisine Gastronomique : Rejoignez notre atelier culinaire et apprenez à cuisiner des plats gastronomiques. Sessions pour débutants et amateurs confirmés. Cours animés par des chefs renommés. Matériel fourni. Réservations au 06 75 43 21 98.`,
        instructions: {
            step1: "Confirm Availability of the Workshop: Ask if there are still spots available to register.",
            step2: "Inquire About Skill Level Requirements: Ask if the workshop is suitable for your level of experience.",
            step3: "Ask About the Chef: Gather details about the chefs who will lead the sessions.",
            step4: "Inquire About the Schedule: Ask when the sessions will take place.",
            step5: "Ask About the Group Size: Determine the number of participants in each session.",
            step6: "Ask About the Duration: Understand how long each session lasts.",
            step7: "Inquire About Materials: Confirm if all cooking equipment and ingredients are provided.",
            step8: "Ask About the Workshop Content: Learn about the dishes or techniques covered in the workshop.",
            step9: "Ask About the Costs: Gather information about the total cost and any additional fees.",
            step10: "Ask About the Location: Find out where the workshop will take place and how to get there."
        },
        suggestions: {
            step1: [
                "Je suis intéressé(e) par votre stage. Y a-t-il encore des places disponibles ?",
                "Les inscriptions sont-elles toujours ouvertes ?",
                "Est-il encore possible de s’inscrire à votre stage ?"
            ],
            step2: [
                "Est-ce que le stage est adapté aux débutants ?",
                "J’ai déjà quelques notions en cuisine, est-ce que je peux m’inscrire ?",
                "Quels sont les prérequis pour participer au stage ?"
            ],
            step3: [
                "Pouvez-vous me donner plus d’informations sur le chef ?",
                "Qui anime les sessions ? Est-ce un chef professionnel ?",
                "Le chef a-t-il une expérience dans les restaurants étoilés ?"
            ],
            step4: [
                "Quels jours ont lieu les sessions ?",
                "À quelle heure commencent et se terminent les ateliers ?",
                "Organisez-vous des sessions en soirée ou seulement en journée ?"
            ],
            step5: [
                "Combien de participants sont prévus par session ?",
                "Limitez-vous le nombre de participants pour chaque session ?",
                "Est-ce qu’il y a encore des places disponibles pour un groupe privé ?"
            ],
            step6: [
                "Quelle est la durée de chaque session ?",
                "Combien de temps dure l’ensemble du stage ?",
                "Les sessions sont-elles intensives ou sur plusieurs semaines ?"
            ],
            step7: [
                "Est-ce que tout le matériel est fourni pour le stage ?",
                "Faut-il apporter ses propres ingrédients ?",
                "Est-ce que vous fournissez les tabliers et autres équipements de cuisine ?"
            ],
            step8: [
                "Quelles techniques ou plats apprend-on pendant le stage ?",
                "Cuisinera-t-on des spécialités locales ou internationales ?",
                "Y a-t-il un thème particulier pour le stage ?"
            ],
            step9: [
                "Quel est le prix total du stage ?",
                "Est-ce que le tarif comprend tout, ou y a-t-il des frais supplémentaires ?",
                "Proposez-vous des réductions pour les groupes ou les étudiants ?"
            ],
            step10: [
                "Où se situe l’atelier ?",
                "Est-il facilement accessible en transports en commun ?",
                "Y a-t-il un parking à proximité pour ceux qui viennent en voiture ?"
            ]
        },
        conversation: `
        Student: Bonjour, excusez-moi de vous déranger. J’ai vu votre annonce concernant le stage de cuisine. Est-ce que c’est bien vous ?  
        Advertiser: Oui, c’est bien nous. Comment puis-je vous aider ?  

        Student: Je suis intéressé(e) par votre stage. Y a-t-il encore des places disponibles ?  
        Advertiser: Oui, il nous reste encore quelques places pour la prochaine session.  

        Student: Parfait ! Est-ce que le stage est adapté aux débutants ?  
        Advertiser: Oui, nous accueillons des participants de tous niveaux, y compris les débutants.  

        Student: Très bien. Qui anime les sessions ? Est-ce un chef professionnel ?  
        Advertiser: Oui, nos ateliers sont animés par des chefs qui ont travaillé dans des restaurants étoilés Michelin.  

        Student: Impressionnant ! Quels jours ont lieu les sessions ?  
        Advertiser: Les sessions se déroulent les samedis et dimanches, de 10h à 13h.  

        Student: Combien de participants y aura-t-il par session ?  
        Advertiser: Nous limitons chaque session à 12 participants pour un encadrement optimal.  

        Student: Et combien de temps dure chaque session ?  
        Advertiser: Chaque session dure trois heures.  

        Student: Est-ce que tout le matériel est fourni pour le stage ?  
        Advertiser: Oui, nous fournissons tout le matériel et les ingrédients nécessaires.  

        Student: Quelles techniques ou plats apprend-on pendant le stage ?  
        Advertiser: Vous apprendrez à préparer des plats gastronomiques, comme le filet de bœuf Wellington et des desserts sophistiqués.  

        Student: Quel est le prix total du stage ?  
        Advertiser: Le stage coûte 250 € pour l’ensemble des sessions, tout compris.  

        Student: Où se situe l’atelier ?  
        Advertiser: L’atelier est situé à Paris, près de la station de métro République.  

        Student: Merci pour toutes ces informations. Je vais réfléchir et vous rappeler pour réserver une place. Bonne journée !  
        Advertiser: Avec plaisir ! Bonne journée à vous aussi.
        `
    }
];

export default topicsOrale;
