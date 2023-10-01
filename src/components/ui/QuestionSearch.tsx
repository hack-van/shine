import { useEffect, useState } from "react";
import { Button as UIButton } from "../ui/button";
import { EditIcon, DeleteIcon } from "lucide-react";
import { Divider } from "@nextui-org/react";
import { api } from "@/utils/api";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
} from "@nextui-org/react";
import { Input } from "./input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";

const SearchResultWrapper = ({ question, qid }) => {
  const { mutate } = api.question.updateQuestion.useMutation();

  const [editQuestion, setEditQuestion] = useState("");

  const handleEdit = (e) => {
    e.preventDefault();
    setEditQuestion(e.target.value);
  };

  const onSubmit = () => {
    mutate({
      qid: qid,
      question: editQuestion,
    });
  };

  return (
    <div>
      <div className="flex w-full justify-between p-4">
        <span className="inline-bloack w-auto">{question}</span>
        <div className="flex justify-between">
          <Dialog>
            <DialogTrigger>
              <EditIcon className="mr-4" color="black" size={18} />
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Question</DialogTitle>
                <DialogDescription>
                  <div className="justify-content mb-8 mt-10 flex">
                    <Input onChange={handleEdit} value={editQuestion} />

                    <UIButton onClick={onSubmit} className="ml-10">
                      Save
                    </UIButton>
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>

          <DeleteIcon className="mr-4" color="black" size={18} />
        </div>
      </div>
      <Divider orientation="horizontal" />
    </div>
  );
};

export default function QuestionSearch({ questions }) {
  const [searchInput, setSearchInput] = useState("");
  const [filterQuestions, setFilterQuestions] = useState([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  useEffect(() => {
    const newQuestion = [];

    questions.forEach((question) => {
      if (
        searchInput.length == 0 ||
        question.question.startsWith(searchInput)
      ) {
        newQuestion.push(question);
      }
    });
    setFilterQuestions(newQuestion);
  }, [searchInput]);

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
          onClick={handleSearch}
          className="relative z-[2] ml-8 rounded border-2 border-primary px-6 py-2 text-xs font-medium uppercase text-primary transition duration-150 ease-in-out hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0"
          type="button"
          id="button-addon3"
          data-te-ripple-init
        >
          Search
        </button>
      </div>

      <div>
        {filterQuestions.map((result, i) => (
          <SearchResultWrapper
            onOpenPopup={onOpen}
            key={i}
            qid={result.qid}
            question={result.question}
          />
        ))}
      </div>
    </div>
  );
}
