const initialState = [
  {
    id: '1',
    name: 'Dark Vador',
    desc: 'Je suis ton père',
  },
  {
    id: '2',
    name: 'Sansa Stark',
    desc: "L'hiver vient",
  },
  {
    id: '3',
    name: 'Tyrion LANNISTER',
    desc: 'Un Lannister paye toujours ses dettes',
  },
];

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
