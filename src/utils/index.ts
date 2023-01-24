export const paginateData = (pageNo: string, pageSize: string) => {
	const _pageNo = pageNo ? parseInt(pageNo) : 1;
	const _pageSize = pageSize ? parseInt(pageSize) : 10;

	const query = {
		skip: _pageSize * (_pageNo - 1),
		limit: _pageSize
	};

	return query;
};

export const generateRandomString = (length = 6) => {
	return Math.random().toString(20).substr(2, length);
};

export const getRandomNumberBetween = (min: number, max: number) => {
	return Math.floor(Math.random() * (max - min + 1) + min);
};