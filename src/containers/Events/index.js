import { useState } from 'react'
import EventCard from '../../components/EventCard'
import Select from '../../components/Select'
import { useData } from '../../contexts/DataContext'
import Modal from '../Modal'
import ModalEvent from '../ModalEvent'

import './style.css'

const PER_PAGE = 9

const EventList = () => {
	const { data, error } = useData()
	const [type, setType] = useState()
	const [currentPage, setCurrentPage] = useState(1)

	// Filters events by type value. If type is undefined or null, displays all events.
	const filteredEvents = (!type ? data?.events : data?.events.filter((event) => event.type === type)) || []

	const changeType = (evtType) => {
		setCurrentPage(1)
		setType(evtType)
	}

	// determines the number of pages and rounds up
	const pageNumber = Math.ceil((filteredEvents?.length || 0) / PER_PAGE)
	// events to display according to the current page
	const eventsToShow = filteredEvents.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE)

	const typeList = new Set(data?.events.map((event) => event.type))
	return (
		<>
			{error && <div>An error occured</div>}
			{data === null ? (
				'loading'
			) : (
				<>
					<h3 className='SelectTitle'>Catégories</h3>
					<Select
						selection={Array.from(typeList)}
						onChange={(value) => (value ? changeType(value) : changeType(null))}
					/>
					<div id='events' className='ListContainer'>
						{eventsToShow.map((event) => (
							<Modal key={event.id} Content={<ModalEvent event={event} />}>
								{({ setIsOpened }) => (
									<EventCard
										onClick={() => setIsOpened(true)}
										imageSrc={event.cover}
										title={event.title}
										date={new Date(event.date)}
										label={event.type}
									/>
								)}
							</Modal>
						))}
					</div>
					<div className='Pagination'>
						{[...Array(pageNumber || 0)].map((_, n) => (
							// eslint-disable-next-line react/no-array-index-key
							<a key={n} href='#events' onClick={() => setCurrentPage(n + 1)}>
								{n + 1}
							</a>
						))}
					</div>
				</>
			)}
		</>
	)
}

export default EventList
