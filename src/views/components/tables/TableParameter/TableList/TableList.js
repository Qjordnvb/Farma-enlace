import React from 'react';
import PropTypes from 'prop-types';

import CRUDTable, {Fields, Field, CreateForm, UpdateForm, Pagination} from 'react-crud-table';

// Component's Base CSS
import './style-list.css';

let tasks = [
  {
    id: 1,
    title: 'Create an example',
    description: 'Create an example of how to use the component'
  },
  {
    id: 2,
    title: 'Improve',
    description: 'Improve the component!'
  },
  {
    id: 3,
    title: 'Create an example',
    description: 'Create an example of how to use the component'
  },
  {
    id: 4,
    title: 'Improve',
    description: 'Improve the component!'
  },
  {
    id: 5,
    title: 'Create an example',
    description: 'Create an example of how to use the component'
  },
  {
    id: 6,
    title: 'Improve',
    description: 'Improve the component!'
  },
  {
    id: 7,
    title: 'Create an example',
    description: 'Create an example of how to use the component'
  },
  {
    id: 8,
    title: 'Improve',
    description: 'Improve the component!'
  }
];

const DescriptionRenderer = ({field}) => <textarea {...field} />;

const SORTERS = {
  NUMBER_ASCENDING: (mapper) => (a, b) => mapper(a) - mapper(b),
  NUMBER_DESCENDING: (mapper) => (a, b) => mapper(b) - mapper(a),
  STRING_ASCENDING: (mapper) => (a, b) => mapper(a).localeCompare(mapper(b)),
  STRING_DESCENDING: (mapper) => (a, b) => mapper(b).localeCompare(mapper(a))
};

const getSorter = (data) => {
  const mapper = (x) => x[data.field];
  let sorter = SORTERS.STRING_ASCENDING(mapper);

  if (data.field === 'id') {
    sorter =
      data.direction === 'ascending'
        ? SORTERS.NUMBER_ASCENDING(mapper)
        : SORTERS.NUMBER_DESCENDING(mapper);
  } else {
    sorter =
      data.direction === 'ascending'
        ? SORTERS.STRING_ASCENDING(mapper)
        : SORTERS.STRING_DESCENDING(mapper);
  }

  return sorter;
};
let count = tasks.length;
const service = {
  fetchItems: (payload) => {
    const {activePage, itemsPerPage} = payload.pagination;
    const start = (activePage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    let result = Array.from(tasks);
    result = result.sort(getSorter(payload.sort));
    return Promise.resolve(result.slice(start, end));
  },
  create: (task) => {
    count += 1;
    tasks.push({
      ...task,
      id: count
    });
    return Promise.resolve(task);
  },
  update: (data) => {
    const task = tasks.find((t) => t.id === data.id);
    task.title = data.title;
    task.description = data.description;
    return Promise.resolve(task);
  },
  delete: (data) => {
    const task = tasks.find((t) => t.id === data.id);
    tasks = tasks.filter((t) => t.id !== task.id);
    return Promise.resolve(task);
  },

  fetchTotal: () => {
    return Promise.resolve(tasks.length);
  }
};

const TableList = () => {
  return (
    <div className="container-grid-list">
      <CRUDTable
        caption="motivos parametrizados"
        fetchItems={(payload) => service.fetchItems(payload)}
        fetchItemsPagination={(payload) => service.fetchItemsPagination(payload)}
      >
        <Fields>
          <Field name="id" label="Id" hideInCreateForm />
          <Field name="title" label="Title" placeholder="Title" />
          <Field name="description" label="Description" render={DescriptionRenderer} />
        </Fields>
        <CreateForm
          title="Task Creation"
          message="Create a new task!"
          trigger="Create Task"
          onSubmit={(task) => service.create(task)}
          submitText="Create"
          validate={(values) => {
            const errors = {};
            if (!values.title) {
              errors.title = "Please, provide task's title";
            }

            if (!values.description) {
              errors.description = "Please, provide task's description";
            }

            return errors;
          }}
        />

        <UpdateForm
          title="Task Update Process"
          message="Update task"
          trigger="Update"
          onSubmit={(task) => service.update(task)}
          submitText="Update"
          validate={(values) => {
            const errors = {};

            if (!values.id) {
              errors.id = 'Please, provide id';
            }

            if (!values.title) {
              errors.title = "Please, provide task's title";
            }

            if (!values.description) {
              errors.description = "Please, provide task's description";
            }

            return errors;
          }}
        />

        <Pagination itemsPerPage={6} fetchTotalOfItems={(payload) => service.fetchTotal(payload)} />
      </CRUDTable>
    </div>
  );
};

TableList.propTypes = {
  field: PropTypes.string
};

export default TableList;
