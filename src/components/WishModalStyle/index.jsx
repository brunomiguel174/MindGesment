import React from 'react';
import Modal from "react-modal";
import { FaTimes, FaTrash } from "react-icons/fa";

import "./style.css";

// Modal personalizada das wish com um style por defeito

export default function WishModalStyle({ children, isModalOpen = false, closeModal, wishName, selectWish, handleDeleteWish }) {

	return (
		<Modal isOpen={isModalOpen || (selectWish != null)} className="Modal">
			<div className="ModalContainer">
				<div className="ModalHeader">
					<button
						title="Cancel"
						className="CloseModal ModalActionBtns"
						onClick={closeModal}
					>
						<FaTimes size="20" color="black" />
					</button>
					<h2>{wishName}</h2>
					{selectWish !== null
						? <button title="Delete Wish" className="ModalActionBtns" onClick={handleDeleteWish}>
							<FaTrash size="20" color="black" /></button>
						: <span></span>}
				</div>

				<div className="ModalMain">{children}</div>
			</div>
		</Modal >
	)
}
