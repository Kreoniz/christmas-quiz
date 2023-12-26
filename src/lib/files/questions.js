const grading = {
  adventurous: 0,
  optimistic: 0,
}

export const questions = [
	{
		question: 'Do you look forward to the next year?',
		id: 0,
		answers: [
			'Of course! There will be so many new opportunities to grow!',
			'Nah, new year, new problems, new web frameworks...'
		],
    points: [[1, 1], [-1, -1]]
	},
	{
		question: 'What web framework would you learn in the new year?',
		id: 1,
		answers: ['Svelte', 'React', 'SolidJS', 'Vue', 'Angular'],
    points: [[1, 0], [-1, 0], [1, 0], [-1, 0], [-1, 0]]
	},
	{
		question: 'Who would be the best Santa?',
		id: 2,
		answers: ['Ken Thompson', 'Linus Torvalds', 'Bill Gates', 'Bjarne Stroustrup'],
    points: [[0, 1], [1, -1], [-1, 0], [1, 0]]
	},
	{
		question: 'Frontend or backend?',
		id: 3,
		answers: ['Frontend', 'Backend'],
    points: [[0, 0], [0, 0]]

	},
	{
		question: 'Which word best describes your work style?',
		id: 4,
		answers: ['Passionate', 'Curious', 'Industrious', 'Meticulous', 'Pragmatic'],
    points: [[1, 1], [1, 1], [0, 1], [1, -1], [0, 1]]
	},
	{
		question: 'What food would you eat while coding?',
		id: 5,
		answers: ['Cookies and milk', 'Candy cane', 'Olivier'],
    points: [[0, 1], [0, 1], [0, 1]]
	},
	{
		question: 'Why learn programming?',
		id: 6,
		answers: [
			'It improves critical thinking',
			'It allowes people to create mesmerizing projects',
			'It pays well'
		],
    points: [[-1, 1], [1, 1], [-1, -1]]
	},
	{
		question: 'How do programmers spend Christmas Holidays?',
		id: 7,
		answers: [
			'Coding some christmas-themed projects',
			'Like normal humans :P',
			'Contemplating the meaning of existence'
		],
    points: [[1, 1], [0, 1], [1, -1]]
	}
];
