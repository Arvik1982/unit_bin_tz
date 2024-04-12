import { useState } from "react";
import createNew_api from "../functions/api/createNew_api";
import styles from "../modal/modalPage.module.css";
import editPosition_api from "../functions/api/editPosition_api";

export default function ModalPage({
  positionName,
  setPositionName,
  positionDescription,
  setPositionDescription,
  positionMeasurement,
  setPositionMeasurement,
  positionCode,
  setPositionCode,
  setModalOpen,
  modalEdit,
  setModalEdit,
  id,
}) {
  const [error, setError] = useState("");

  const saveClick = () => {
    if (positionName) {
      console.log("saved");
      createNew_api(
        positionName,
        positionDescription,
        positionMeasurement,
        positionCode
      );
      setModalOpen(false);
    } else {
      setError("Заполните название");
    }
  };

  const saveEditClick = () => {
    if (positionName) {
      console.log("edited");
      editPosition_api(
        positionName,
        positionDescription,
        positionMeasurement,
        positionCode,
        id
      );
      setModalOpen(false);
    } else {
      setError("Заполните название");
    }
  };

  const cleanFieldsClick = () => {
    setPositionName("");
    setPositionDescription("");
    setPositionMeasurement("");
    setPositionCode("");
  };

  return (
    <>
    {/*создание новой позиции */}
      {!modalEdit && (
        <div className={styles.content}>
          <h3>Новая позиция</h3>
          <input
            onChange={(e) => {
              setPositionName(e.target.value);
            }}
            value={positionName}
            placeholder="название"
            key={"positionName"}
            className={styles.content__input}
            type="text"
          ></input>
          <textarea
            onChange={(e) => {
              setPositionDescription(e.target.value);
            }}
            value={positionDescription}
            placeholder="описание"
            key={"positionDescription"}
            className={styles.content__input}
            type="text"
          ></textarea>
          <input
            onChange={(e) => {
              setPositionMeasurement(e.target.value);
            }}
            value={positionMeasurement}
            placeholder="единица"
            key={"positionMeasurement"}
            className={styles.content__input}
            type="text"
          ></input>
          <input
            onChange={(e) => {
              setPositionCode(e.target.value);
            }}
            value={positionCode}
            placeholder="Артикул"
            key={"positionCode"}
            className={styles.content__input}
            type="text"
          ></input>
          <button
            onClick={() => {
              saveClick();
              cleanFieldsClick();
            }}
            type="button"
          >
            Сохранить
          </button>
          {error && <div style={{ color: "red" }}>{error}</div>}
          <button
            onClick={() => {
              setModalOpen(false);
              setModalEdit(false);
              cleanFieldsClick();
            }}
            type="button"
          >
            Отмена
          </button>
        </div>
      )}
{/* редактирование позиции */}
      {modalEdit && (
        <div className={styles.content}>
          <h3>Изменить позицию:</h3>
          <div>{positionName}</div>
          <input
            onChange={(e) => {
              setPositionName(e.target.value);
            }}
            value={positionName}
            placeholder="название"
            key={"positionName"}
            className={styles.content__input}
            type="text"
          ></input>
          <textarea
            onChange={(e) => {
              setPositionDescription(e.target.value);
            }}
            value={positionDescription}
            placeholder="описание"
            key={"positionDescription"}
            className={styles.content__input}
            type="text"
          ></textarea>
          <input
            onChange={(e) => {
              setPositionMeasurement(e.target.value);
            }}
            value={positionMeasurement}
            placeholder="единица"
            key={"positionMeasurement"}
            className={styles.content__input}
            type="text"
          ></input>
          <input
            onChange={(e) => {
              setPositionCode(e.target.value);
            }}
            value={positionCode}
            placeholder="Артикул"
            key={"positionCode"}
            className={styles.content__input}
            type="text"
          ></input>
          <button
            onClick={() => {
              saveEditClick();
              cleanFieldsClick();
            }}
            type="button"
          >
            Сохранить
          </button>
          {error && <div style={{ color: "red" }}>{error}</div>}
          <button
            onClick={() => {
              setModalOpen(false);
              setModalEdit(false);
              cleanFieldsClick();
            }}
            type="button"
          >
            Отмена
          </button>
        </div>
      )}
    </>
  );
}
