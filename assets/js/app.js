Vue.component('todo-list', {
    props: ['todo'],
    template: `
        <div>
        <div style="width: 300px; clear: both;">
            <p style="float: left;"> <input type="checkbox" :value="todo.title" :id="todo.id"></p>
            <p style="float: left;"> {{ todo.title }} </p>
            <p style="float: right;"><a href="#" style="text-decoration: none; color: red;"
                    @click="removeTodo(todo.id)">remove</a>
            </p>
        </div>
        <div>
    `
});

var app = new Vue({
    el: '#app',
    data: {
        id: 3,
        input: '',
        todos: [
            {
                id: 1,
                title: "Makan",
                checked: false,
                edit: false
            },
            {
                id: 2,
                title: "Tidur",
                checked: false,
                edit: false
            }
        ],
        lists: [],
    },
    computed: {
        // sortByIdDESC: function () {
        //     return _.orderBy(this.todos, 'id', 'desc');
        // },
        selectAll: function () {
            return this.todos.every(function (todo) {
                return todo.checked;
            });
        }
    },
    methods: {
        addTodo: function () {
            // this.todos.push(this.input);
            this.todos.push({ id: this.id, title: this.input, checked: false, edit: false });
            this.input = null;
            this.id = this.id + 1;
        },
        removeTodo: function (idx) {
            this.todos.splice(idx, 1);
            // this.todos.filter(todo => todo.id != idx);
        },
        toggleChecked: function (todo) {
            todo.checked = !todo.checked;
        },
        toggleAll: function () {
            var select = this.selectAll;
            this.todos.forEach(function(todo) {
                todo.checked = !select;
            });
            this.selectAll = !select;
        },
        all: function () {
            this.lists = [...this.todos];
        },
        checked: function () {
            this.lists = this.todos.filter(todo => todo.checked == true);
        },
        pending: function () {
            this.lists = this.todos.filter(todo => todo.checked == false);
        }
    },
    directives: {
        focus: {
            inserted(el) {
                el.focus()
            }
        }
    }
});
