import { useEffect, useState } from "react";
import styles from "../src/app.module.css";
import icon_search from "../src/img/icon_search.svg";
import edit_icon from "../src/img/edit_icon.svg";
import pagination_arrow from "../src/img/pagination_arrow.svg";
import getData_api from "./functions/api/getData_api";
import getBlockOfPageNumbers from "./functions/data/getBlockOfPageNumbers";
// import createNew_api from './functions/api/createNew_api'
import ModalPage from "./modal/ModalPage";

function App() {
  const [pageData, setPageData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState("");
  const [pagesArr, setPagesArr] = useState([]);
  const [pagesArrBlock, setPagesArrBlock] = useState([]);
  const [pagesArrBlockNumber, setPagesArrBlockNumber] = useState(0);
  const [buttonChecked, setButtonChecked] = useState("");
  const [pagesArrBlockNumberLength, setPagesArrBlockNumberLength] = useState(6);
  const [sortOrder, setSortOrder] = useState("ASC");
  const [positionName, setPositionName] = useState("");
  const [positionDescription, setPositionDescription] = useState("");
  const [positionMeasurement, setPositionMeasurement] = useState("");
  const [positionCode, setPositionCode] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [id, setId] = useState("");

  const handleNextClick = () => {
    if (pagesArrBlockNumberLength > pageNumber) {
      setPageNumber(pageNumber + 1);
    } else {
      if (pageData.length === Number(pageSize)) {
        setPagesArrBlockNumberLength(pagesArrBlockNumberLength + 6);
        setPagesArrBlockNumber(pagesArrBlockNumber + 1);
        setPageNumber(pageNumber + 1);
      }
    }
  };

  useEffect(() => {
    getData_api(
      setPageData,
      pageNumber,
      pageSize,
      setTotalPages,
      setPagesArr,
      sortOrder
    );
    setPageSize(pageSize);
  }, [pageNumber, pageSize, sortOrder, modalOpen]);

  useEffect(() => {
    getBlockOfPageNumbers(pagesArr, setPagesArrBlock, totalPages);
  }, [pagesArr]);

  return (
    <div className={styles.content__block}>
      {/* header */}
      {modalOpen && (
        <ModalPage
          positionName={positionName}
          setPositionName={setPositionName}
          positionDescription={positionDescription}
          setPositionDescription={setPositionDescription}
          positionMeasurement={positionMeasurement}
          setPositionMeasurement={setPositionMeasurement}
          positionCode={positionCode}
          setPositionCode={setPositionCode}
          setModalOpen={setModalOpen}
          modalEdit={modalEdit}
          setModalEdit={setModalEdit}
          id={id}
        />
      )}
      <div className={styles.content__block_header}>
        <div className={styles.block__header_left}>
          <div className={styles.block__header_title}>
            <span className={styles.header__title_text}>Номенклатура</span>
            <div className={styles.header__title_number}>54 единиц</div>
          </div>
        </div>
        <div className={styles.block__header_right}>
          <div className={styles.block__header_search}>
            <img
              className={styles.header__search_img}
              src={icon_search}
              alt="search"
            />
            <input
              placeholder="Поиск по названию"
              className={styles.header__search_input}
              type="search"
            />
            <button className={styles.header__search_button} type="button">
              Найти
            </button>
          </div>
          {/* add new position */}
          <div className={styles.block__header_add}>
            <button
              onClick={() => {
                modalOpen ? setModalOpen(false) : setModalOpen(true);
                setModalEdit(false);
              }}
              className={styles.header__add_button}
            >
              + Новая позиция
            </button>
          </div>
        </div>
      </div>
      {/* body */}
      <div className={styles.content__block_body}>
        <div className={styles.block__body_title}>
          {/* сортировка по названию */}
          <div
            onClick={() => {
              sortOrder === "ASC" ? setSortOrder("DESC") : setSortOrder("ASC");
            }}
            className={styles.body__title_element}
          >
            Название
          </div>
          <div className={styles.body__title_element}>Единица</div>
          <div className={styles.body__title_element}>Артикул</div>
          <div className={styles.body__title_element}> </div>
        </div>
        {pageData.length !== 0
          ? pageData?.map((el) => {
              return (
                <div key={el.id} className={styles.block__body_data}>
                  <div className={styles.body__data_element}>{el.name}</div>
                  <div className={styles.body__data_element}>
                    {el.measurement_units}
                  </div>
                  <div className={styles.body__data_element}>#{el.code}</div>
                  <div className={styles.body__data_element}>
                    {/* edit */}
                    <img
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setModalOpen(true);
                        setModalEdit(true);
                        setPositionName(el.name);
                        setId(el.id);
                        setPositionCode(el.code);
                        setPositionMeasurement(el.measurement_units);
                        setPositionDescription(el.description);
                      }}
                      src={edit_icon}
                      alt="edit"
                    />{" "}
                  </div>
                </div>
              );
            })
          : ""}
      </div>

      {/* footer */}
      <div className={styles.content__block_footer}>
        <div className={styles.block__footer_pagination}>
          {/* пагинация */}
          {pagesArrBlock.length !== 0
            ? pagesArrBlock[pagesArrBlockNumber]?.map((el) => {
                return (
                  <div
                    key={el}
                    onClick={() => {
                      setPageNumber(el);
                      setButtonChecked(el);
                    }}
                    className={
                      buttonChecked === el
                        ? styles.pagination__button_checked
                        : styles.footer__pagination_button
                    }
                  >
                    {el}
                  </div>
                );
              })
            : ""}
          <div
            onClick={() => {
              handleNextClick();
              setButtonChecked(pageNumber + 1);
            }}
            className={styles.footer__pagination_button}
          >
            <img src={pagination_arrow} alt="arrow" />
          </div>
        </div>
        <div className={styles.block__footer_size}>
          <div className={styles.block__footer_text}>Показывать по:</div>
          {/* размер страницы */}
          <select
            onChange={(e) => {
              setPageSize(e.target.value);
            }}
            className={styles.footer__size_select}
            name="select"
            id="select"
          >
            <option className={styles.size__select_item} value="10">
              10
            </option>
            <option className={styles.size__select_item} value="30">
              30
            </option>
            <option className={styles.size__select_item} value="50">
              50
            </option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default App;
