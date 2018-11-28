var app = angular.module("todoListApp", []);

app.controller("myCtrl", function ($scope) {

	$scope.categories = [];
	$scope.tasks = [];
	$scope.selectedCategory = -1;
	$scope.selectedCategoryValue = '';
	$scope.selectedCategoryForTask = null;
	$scope.addTask = null;
	$scope.selectedTask = -1;
	$scope.selectedTaskName = '';
	$scope.viewSelectedCategory = null;

	if (localStorage.getItem('categories') != null) {
		$scope.categories = JSON.parse(localStorage.getItem("categories"));
	}

	if (localStorage.getItem('tasks') != null) {
		$scope.tasks = JSON.parse(localStorage.getItem("tasks"));
	}

	$scope.addCat = function () {

		$scope.warningmessage = "";

		if (!$scope.add) {
			$scope.warningmessage = "* Enter a title for your category ";
			return;
		}

		if ($scope.categories.indexOf($scope.add) == -1) {
			$scope.categories.push($scope.add);
			$scope.add = '';
			localStorage.setItem("categories", JSON.stringify($scope.categories));
		} else {
			$scope.warningmessage = "* You already have a category with this title";
		}
	}

	$scope.addTask = function () {

		$scope.warningmessage = "";

		if (!$scope.addTaskTitle) {
			$scope.warningmessage = '* Enter a title for your task';
			return;
		}

		if (!$scope.addTaskDescription) {
			$scope.warningmessage = '* Enter a description for your task';
			return;
		}

		if (!$scope.addTaskDate) {
			$scope.warningmessage = '* Pick a duedate for your task';
			return;
		}

		if ($scope.selectedCategoryForTask == null) {
			$scope.warningmessage = '* Choose a specific category for your task';
			return;
		}

		var month = $scope.addTaskDate.getMonth() + 1;

		$scope.addTask = {
			name: $scope.addTaskTitle,
			Description: $scope.addTaskDescription,
			DueDate: $scope.addTaskDate.getFullYear() + "/" + month + "/" + $scope.addTaskDate.getDate(),
			Tags: $scope.addTaskTags,
			Cat: $scope.selectedCategoryForTask
		}

		var exist = false;

		for (var i = 0; i < $scope.tasks.length; i++) {
			if ($scope.addTaskTitle == $scope.tasks[i].name) {
				exist = true;
				break;
			}
		}

		if (!exist) {

			$scope.tasks.push($scope.addTask);
			$scope.addTaskTitle = '';
			$scope.addTaskDescription = '';
			$scope.addTaskDate = '';
			$scope.addTaskTags = '';
			localStorage.setItem("tasks", JSON.stringify($scope.tasks));

		} else {
			$scope.warningmessage = "* You already have a task with this title";
		}
	}

	$scope.editTask = function () {

		$scope.warningmessage = "";

		if ($scope.selectedTask == -1) {
			$scope.warningmessage = '* Select a task to edit';
		} else {
			if (!$scope.editTaskTitle) {
				$scope.warningmessage = '* Enter a title for your task';
				return;
			}

			if (!$scope.editTaskDescription) {
				$scope.warningmessage = '* Enter a description for your task';
				return;
			}

			if (!$scope.editTaskDate) {
				$scope.warningmessage = '* Pick a duedate for your task';
				return;
			}

			if ($scope.selectedCategoryForTaskEdit == null) {
				$scope.warningmessage = '* Choose a specific category for your task';
				return;
			}

			var month = $scope.editTaskDate.getMonth() + 1;

			$scope.addTask = {
				name: $scope.editTaskTitle,
				Description: $scope.editTaskDescription,
				DueDate: $scope.editTaskDate.getFullYear() + "/" + month + "/" + $scope.editTaskDate.getDate(),
				Tags: $scope.editTaskTags,
				Cat: $scope.selectedCategoryForTaskEdit
			}

			var exist = false;

			var index = -1;

			for (var i = 0; i < $scope.tasks.length; i++) {
				if ($scope.selectedTaskName == $scope.tasks[i].name) {
					exist = true;
					index = i;
					break;
				}

			}

			if (exist) {

				$scope.tasks[index] = $scope.addTask;
				$scope.editTaskTitle = '';
				$scope.editTaskDescription = '';
				$scope.editTaskDate = '';
				$scope.editTaskTags = '';
				$scope.selectedCategoryForTask = null;
				localStorage.setItem("tasks", JSON.stringify($scope.tasks));
				$scope.selectedTask = -1;
				$scope.selectedTaskName = '';

			} else {
				$scope.warningmessage = "Please Select Task";
			}
		}
	}

	$scope.editCat = function () {

		$scope.warningmessage = "";
		if ($scope.selectedCategory == -1) {
			$scope.warningmessage = "* Please select a category to edit";
		} else {

			if (!$scope.edit) {
				return;
			}
			if ($scope.categories.indexOf($scope.edit) == -1) {
				$scope.categories[$scope.selectedCategory] = $scope.edit;
				$scope.edit = '';
				localStorage.setItem("categories", JSON.stringify($scope.categories));
				$scope.selectedCategory = -1;
				$scope.selectedCategoryValue = '';
			} else {
				$scope.warningmessage = "* Please select a category to edit";
			}
		}
	}

	$scope.removeCat = function (element) {
		$scope.warningmessage = "";
		$scope.categories.splice(element, 1);
		localStorage.setItem("categories", JSON.stringify($scope.categories));
		$scope.selectedCategory = -1;
		$scope.selectedCategoryValue = '';
	}

	$scope.removeTask = function (element) {
		$scope.warningmessage = "";
		$scope.tasks.splice(element, 1);
		localStorage.setItem("tasks", JSON.stringify($scope.tasks));
		$scope.editTaskTitle = '';
		$scope.editTaskDate = '';
		$scope.editTaskDescription = '';
		$scope.editTaskTags = '';
		$scope.selectedTask = -1;
		$scope.selectedTaskName = '';
	}

	$scope.viewCat = function (element) {
		$scope.warningmessage = "";
		$scope.selectedCategory = element;
		$scope.selectedCategoryValue = $scope.categories[element];
		$scope.edit = $scope.categories[element];
	}

	$scope.setCat = function (element) {
		$scope.viewSelectedCategory = $scope.categories[element];
	}

	$scope.viewTask = function (element) {
		$scope.warningmessage = "";
		$scope.selectedTask = element;
		$scope.selectedTaskName = $scope.tasks[element].name;
		$scope.editTaskTitle = $scope.tasks[element].name;
		$scope.editTaskDescription = $scope.tasks[element].Description;
		$scope.editTaskDate = new Date($scope.tasks[element].DueDate);
		$scope.editTaskTags = $scope.tasks[element].Tags;
		$scope.selectedCategoryForTaskEdit = $scope.tasks[element].Cat;
	}

	$scope.fillData = function (element) {
		$scope.viewselectedtasktitle = element.name;
		$scope.viewselectedtaskdescription = element.Description;
		$scope.viewselectedtaskdate = element.DueDate;
		$scope.viewselectedtasktags = element.Tags;
		$scope.viewselectedtaskcategory = element.Cat;
	}
});