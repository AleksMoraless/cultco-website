const files = {
  companyCard: new URL('../data/companyCard.pdf', import.meta.url).href
};


export function downloadFile(): void {
    // URL файла на сервере
    // const fileUrl: string = '/files/document.pdf';
    
    // Создаем ссылку для скачивания
    const link = document.getElementById('downloadLink') as HTMLAnchorElement;
    
    if (!link) {
        console.error('Элемент с id "downloadLink" не найден');
        return;
    }
    
    link.href = files.companyCard;
    link.download = 'companyCard.pdf'; // Имя файла при сохранении
    link.click();
}