import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Form, useLoaderData, useSubmit } from "react-router-dom";
import CategoriesFilter from "../../components/home/CategoriesFilter/CategoriesFilter";
import ProductList from "../../components/home/ProductList/ProductList";

import "./Home.css";

const Home = () => {
  const formId = useId();
  const submit = useSubmit();
  const formRef = useRef();
  const { categories, title } = useLoaderData();
  const [titleValue, setTitleValue] = useState(title);

  const handleChangeCategories = useCallback(() => {
    if (!formRef.current) return;

    submit(formRef.current);
  }, [submit]);

  useEffect (() => {
    setTitleValue(title);
  }, [title]);
  
  return (
    <div className="home-container">
      <aside>
        <CategoriesFilter
          formId={formId}
          onChangeCategories={handleChangeCategories}
          initialCategories={categories} />
      </aside>

      <section className="home-form">
        <Form id={formId} ref={formRef}>
          <input
            type="search"
            name="title"
            value={titleValue}
            onChange={(e) => setTitleValue(e.target.value)}
            placeholder="what are your looking for?"
          />
          <button>
            <i className='bx bx-search' ></i>
          </button>
        </Form>  
        <ProductList categories={categories} title={title}/>
      </section>
    </div>
  );
};

export default Home;