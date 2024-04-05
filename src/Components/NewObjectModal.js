import { useState } from "react";
import Button from "./Button";

export default NewObjectModal;

function NewObjectModal({
  handleAdd,
  children,
  btnText,
  placeId,
  className,
  handleCloseModal,
}) {
  const [id, setId] = useState(placeId);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const topic = { id: placeId || id, name, description };
    e.target.reset();
    console.log(topic);
    handleAdd(topic);
    console.log("submitted");
  }
  const ModalClass = `form + ${className}`;
  return (
    <>
      <form className={ModalClass} onSubmit={handleSubmit}>
        <button className="close-modal-btn" onClick={handleCloseModal}>
          ❌
        </button>
        <h2>{children}</h2>
        <div className="text-input">
          <label>ID</label>
          <input
            value={placeId}
            type="text"
            onChange={(e) => setId(e.target.value)}></input>
        </div>

        <div className="text-input">
          <label>Name</label>
          <input type="text" onChange={(e) => setName(e.target.value)}></input>
        </div>

        <div className="text-input">
          <label>Description</label>
          <input
            type="text"
            onChange={(e) => setDescription(e.target.value)}></input>
        </div>

        <Button>{btnText}</Button>
      </form>
    </>
  );
}
