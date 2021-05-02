// export default function Pet({ name, animal, breed }) {
//   return React.createElement("div", {}, [
//     React.createElement("h2", {}, name),
//     React.createElement("h3", {}, animal),
//     React.createElement("h3", {}, breed),
//   ]);
// }

const Pet = ({ name, animal, breed }) => {
  return (
    <div>
      <h2>{name}</h2>
      <h3>{animal}</h3>
      <h3>{breed}</h3>
    </div>
  );
};

export default Pet;
