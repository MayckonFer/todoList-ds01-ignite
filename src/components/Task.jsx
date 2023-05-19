/* eslint-disable no-undef */
import { useState } from "react";
import styles from "./Task.module.css";
import { FiPlusCircle } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import ClipBoard from "/assets/images/clipboard.svg";
import { v4 as uuidv4 } from "uuid";

export function Task() {
  const [task, setTask] = useState([]);
  const [titleTask, setTitleTask] = useState("");
  const [taskIsFinish, setTaskIsFinish] = useState(false);

  const newTask = {
    id: uuidv4(),
    title: titleTask,
    isComplete: taskIsFinish,
  };

  const countCheck = task.reduce(
    (count, item) => (item.isComplete ? count + 1 : count),
    0
  );

  function handleNewTask() {
    if (!titleTask) return;

    setTask((state) => [...state, newTask]);
    setTitleTask("");
  }

  function handleIsComplete(id) {
    const newTasks = task.map((item) =>
      item.id === id
        ? {
            ...item,
            isComplete: !item.isComplete,
          }
        : item
    );

    setTask(newTasks);
    setTaskIsFinish(false);
  }

  function handleRemoveTask(id) {
    const filteredTask = task.filter((item) => item.id !== id);

    setTask(filteredTask);
  }

  return (
    <div className={styles.containerTask}>
      <form className={styles.createTask}>
        <input
          type="text"
          placeholder="Adicione uma nova tarefa"
          value={titleTask}
          onChange={(e) => setTitleTask(e.target.value)}
        />

        <button title="Criar tarefa" type="button" onClick={handleNewTask}>
          Criar
          <FiPlusCircle size={16} fontWeight={"bold"} />
        </button>
      </form>

      <header className={styles.topTask}>
        <p>
          Tarefas criadas <span>{task.length}</span>
        </p>
        <p>
          Concluídas{" "}
          <span>
            {countCheck} de {task.length}
          </span>
        </p>
      </header>

      {task.length === 0 && (
        <div className={styles.notTasks}>
          <img src={ClipBoard} alt="ClipBoard" />

          <div>
            <strong>Você ainda não tem tarefas cadastradas</strong>
            <p>Crie tarefas e organize seus itens a fazer</p>
          </div>
        </div>
      )}

      {task.map((item) => (
        <div className={styles.contentTask} key={item.id}>
          <input
            type="checkbox"
            id="isFinishTask"
            checked={item.isComplete}
            onChange={() => handleIsComplete(item.id)}
          />

          <p className={item.isComplete ? styles.isFinish : ""}>{item.title}</p>

          <button
            type="button"
            title="Deletar tarefa"
            onClick={() => handleRemoveTask(item.id)}
          >
            <RiDeleteBin6Line size={24} weight="bold" />
          </button>
        </div>
      ))}
    </div>
  );
}
