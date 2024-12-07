const restaurant = {
  topic: 'Restaurant',
  groups: [
    {
      instruction: 'Appelez pour réserver une table au restaurant, mentionnez que vous avez une demande spéciale et posez des questions sur le menu.',
      examples: [
        {
          question: 'Bonjour, j’aimerais réserver une table pour demain soir, est-ce possible ?',
          answer: 'Oui, nous avons encore des disponibilités. Combien de personnes serez-vous ?',
        },
        {
          question: 'Ce sera pour deux personnes. Par ailleurs, proposez-vous des options végétariennes sur votre menu ?',
          answer: 'Oui, nous avons plusieurs plats végétariens, y compris des salades et des pâtes.',
        },
        {
          question: 'Très bien, pourriez-vous aussi me dire si vous avez une terrasse ou un espace extérieur ?',
          answer: 'Oui, nous avons une terrasse qui est ouverte en soirée, si la météo le permet.',
        },
      ],
      showSuggestion: {
        alternativeQuestions: {
          reserverTable: [
            'Bonjour, puis-je réserver une table pour demain ?',
            'Avez-vous des disponibilités pour deux personnes samedi soir ?',
            'Je souhaiterais réserver une table pour ce soir à 20 h, est-ce encore possible ?',
          ],
          menuOptions: [
            'Avez-vous des plats végétariens sur votre menu ?',
            'Proposez-vous des options sans gluten ?',
            'Y a-t-il des plats pour enfants sur votre menu ?',
          ],
        },
      },
      fullConversation: [
        { question: 'Bonjour, j’aimerais réserver une table pour demain soir, est-ce possible ?', answer: 'Oui, nous avons encore des disponibilités. Combien de personnes serez-vous ?' },
        { question: 'Ce sera pour deux personnes. Par ailleurs, proposez-vous des options végétariennes sur votre menu ?', answer: 'Oui, nous avons plusieurs plats végétariens, y compris des salades et des pâtes.' },
        { question: 'Très bien, pourriez-vous aussi me dire si vous avez une terrasse ou un espace extérieur ?', answer: 'Oui, nous avons une terrasse qui est ouverte en soirée, si la météo le permet.' }
      ]
    },
    // Add more groups as needed
  ],
};

export default restaurant;