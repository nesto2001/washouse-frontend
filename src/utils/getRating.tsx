function getRating(rating: number): string {
    let ratingText = '';
    if (rating >= 0 && rating <= 1) {
        ratingText = 'Rất tệ';
    } else if (rating > 1 && rating <= 2) {
        ratingText = 'Chưa ổn';
    } else if (rating > 2 && rating <= 3) {
        ratingText = 'Trung bình';
    } else if (rating > 3 && rating <= 4) {
        ratingText = 'Khá tốt';
    } else if (rating > 4 && rating <= 5) {
        ratingText = 'Tuyệt vời';
    }
    return ratingText;
}

export default getRating;
