export default function Todo({ todo, toggleTodo }) {
  function handleTodoClick() {
    toggleTodo(todo.id);
  }

  return (
    <div>
      <label>
        <input
          className="check-box"
          type="checkbox"
          checked={todo.complete}
          onChange={handleTodoClick}
        />
        {todo.name}
      </label>
    </div>
  );
}
