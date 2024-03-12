import { useEffect, useState } from 'react'
import { useData } from '../../contexts/DataContext'
import { getMonth } from '../../helpers/Date'

import './style.scss'

const Slider = () => {
	const { data } = useData()
	const [index, setIndex] = useState(0)
	// faire une copie de la liste plutôt ?
	const byDateDesc = data?.focus.sort((evtA, evtB) => new Date(evtA.date) - new Date(evtB.date))
	/*   const byDateDesc = data?.focus.sort((evtA, evtB) =>
  new Date(evtB.date) - new Date(evtA.date)
); */

	/* 	const nextCard = () => {
		setTimeout(() => setIndex(index < byDateDesc.length - 1 ? index + 1 : 0), 5000)
	}
	useEffect(() => {
		nextCard()
	}) */

	useEffect(() => {
		// Création d'un intervalle pour passer à la carte suivante toutes les 5 secondes.
		const nextCard = setInterval(() => {
			setIndex((prevIndex) => (prevIndex + 1) % byDateDesc.length)
		}, 5000)

		// Nettoyage de l'intervalle lors du démontage du composant pour éviter les fuites de mémoire.
		return () => clearInterval(nextCard)
	}, [byDateDesc]) // Dépendance à byDateDesc pour recalculer si la liste d'événements change.

	return (
		<div className='SlideCardList'>
			{byDateDesc?.map((event, idx) => (
				<div key={event.title} className={`SlideCard SlideCard--${index === idx ? 'display' : 'hide'}`}>
					<img src={event.cover} alt='forum' />
					<div className='SlideCard__descriptionContainer'>
						<div className='SlideCard__description'>
							<h3>{event.title}</h3>
							<p>{event.description}</p>
							<div>{getMonth(new Date(event.date))}</div>
						</div>
					</div>
				</div>
			))}
			<div className='SlideCard__paginationContainer'>
				<div className='SlideCard__pagination'>
					{byDateDesc?.map((event, radioIdx) => (
						<input
							key={event.title}
							type='radio'
							name='radio-button'
							checked={index === radioIdx}
							onChange={() => setIndex(radioIdx)}
						/>
					))}
				</div>
			</div>
		</div>
	)
}

export default Slider
