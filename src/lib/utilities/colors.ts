const colors = ['red', 'yellow', 'blue', 'purple', 'orange', 'green', 'black', 'pink'];

export const generateRandomColor = (): string => {
	return colors[Math.floor(Math.random() * colors.length)];
};
