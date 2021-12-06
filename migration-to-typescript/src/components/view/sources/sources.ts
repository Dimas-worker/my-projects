import './sources.css';

export interface DataSources {
    id: string;
    name: string;
}

class Sources {
    draw(data: DataSources[]): void {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement;

        data.forEach((item: DataSources) => {
            const sourceClone = sourceItemTemp?.content.cloneNode(true) as HTMLElement;
            sourceClone.querySelector('.source__item-name')!.textContent = item.name;
            sourceClone.querySelector('.source__item')?.setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        document.querySelector('.sources')?.append(fragment);
    }
}

export default Sources;
