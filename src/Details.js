import { Component } from "react";
import { withRouter } from "react-router-dom";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import ThemeContext from "./ThemeContext";
import Modal from "./Modal";

class Details extends Component {
  state = { loading: true, showModal: false };

  async componentDidMount() {
    let animalFinal = {};

    try {
      const animal = await fetch(
        `https://aliefdany.me/api/pets/animals/${this.props.match.params.id}`
      );
      animalFinal = await animal.json();
    } catch (e) {
      console.error("animal not found");
    }

    this.setState({
      url: animalFinal.url,
      name: animalFinal.name,
      animal: animalFinal.type,
      location: `${animalFinal.contact.address.city}, ${animalFinal.contact.address.state}`,
      description: animalFinal.description,
      media: animalFinal.photos,
      breed: animalFinal.breeds.primary,
      loading: false,
    });
  }

  toggleModal = () => this.setState({ showModal: !this.state.showModal });
  adopt = () => window.open(this.state.url, "_blank");

  render() {
    if (this.state.loading) {
      return <h2>loading … </h2>;
    }

    const {
      animal,
      breed,
      location,
      description,
      name,
      media,
      showModal,
    } = this.state;

    return (
      <div className="details">
        <Carousel media={media} />;
        <div>
          <h1>{name}</h1>
          <h2>{`${animal} - ${breed} - ${location}`}</h2>
          <ThemeContext.Consumer>
            {([theme]) => (
              <button
                onClick={this.toggleModal}
                style={{ backgroundColor: theme }}
              >
                Adopt {name}
              </button>
            )}
          </ThemeContext.Consumer>
          <p>{description}</p>

          {showModal ? (
            <Modal>
              <div>
                <h1>Would you like to adopt {name}?</h1>
                <div className="buttons">
                  <button onClick={this.adopt}>Yes</button>
                  <button onClick={this.toggleModal}>No</button>
                </div>
              </div>
            </Modal>
          ) : null}
        </div>
      </div>
    );
  }
}

const DetailsWithRouter = withRouter(Details);

export default function DetailsErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <DetailsWithRouter {...props} />
    </ErrorBoundary>
  );
}
