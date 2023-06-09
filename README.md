# AdvancedTaskManagement



## API Reference

https://taskmanagementbackend-wt2p.onrender.com

#### Get all Tasks

```http
  GET /api/get-all-talks
```
### Add a Task
```http
  POST /api/add-task
```

| Body      | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `task_id` | `string` | **Required**. Id of item          |
| `task`    | `string` | **Required**. task-title of item  |
|`completed`| `boolean`| **Required**. completed status    |

#### Mark as Complete/Mark as incomplete 

```http
  POST /api/mark-as-complete/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item          |

#### DELETE

```http
  DELETE /api/remove-task/?remove="id"
```

| Query     | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item          |

### UPDATE A TASK
```http
  PUT /api/update-task
```

| Query     | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item          |








