import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { EditIcon, DeleteIcon } from "lucide-react";
import { Divider } from "@nextui-org/react";

const SearchResultWrapper = ({ question }) => {
  return (
    <div>
      <div className="flex w-full justify-between p-4">
        <span className="inline-bloack w-auto">{question.question}</span>
        <div className="flex justify-between">
          <EditIcon className="mr-4" color="white" size={18} />
          <DeleteIcon className="mr-4" color="white" size={18} />
        </div>
      </div>
      <Divider orientation="horizontal" />
    </div>
  );
};

export default function QuestionSearch({ questions }) {
  console.log(questions);

  const [searchInput, setSearchInput] = useState("");
  const [filterQuestions, setFilterQuestions] = useState(questions);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  // useEffect(() => {
  //   const filteredQuestions = questions.filter((question) => {
  //     question.startsWith(searchInput);
  //   });
  //   setFilterQuestions(filteredQuestions);
  // }, [searchInput]);

  return (
    <div className="mt-10">
      <div className="relative mb-4 flex w-full flex-wrap items-stretch">
        <input
          type="search"
          className="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-bl rounded-br rounded-tl rounded-tr border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
          aria-label="Search"
          aria-describedby="button-addon3"
          onChange={handleSearch}
          value={searchInput}
        />

        <button
          className="relative z-[2] ml-8 rounded border-2 border-primary px-6 py-2 text-xs font-medium uppercase text-primary transition duration-150 ease-in-out hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0"
          type="button"
          id="button-addon3"
          data-te-ripple-init
        >
          Search
        </button>
      </div>

      <div>
        {questions.map((result, i) => (
          <SearchResultWrapper key={i} question={result} />
        ))}
      </div>
    </div>
  );
}
