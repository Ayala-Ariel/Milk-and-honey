"use client";
import React from "react";
import { useCart } from "@/contexts/CartContext";
import styles from "./CartDropdown.module.css";
import Image from "next/image";

export default function CartDropdown({ open, onClose }: { open: boolean; onClose: () => void }) {
	const { cartItems, total, removeFromCart } = useCart();

		if (!open) return null;

		return (
		<div className={styles.dropdownOverlay} onClick={onClose}>
			<div className={styles.dropdown} onClick={e => e.stopPropagation()}>
				<div className={styles.header}>
					<span>Shopping Cart</span>
					<button className={styles.closeBtn} onClick={onClose}>&times;</button>
				</div>
				{cartItems.length === 0 ? (
					<div className={styles.empty}>Your cart is empty.</div>
				) : (
					<div className={styles.items}>
						{cartItems.map(item => (
							<div key={item.id} className={styles.item}>
								<Image src={item.image} alt={item.title} width={50} height={50} />
								<div className={styles.info}>
									<div className={styles.title}>{item.title}</div>
									<div className={styles.qty}>Qty: {item.quantity}</div>
									<div className={styles.price}>${(item.price * item.quantity).toFixed(2)}</div>
								</div>
								<button className={styles.removeBtn} onClick={() => removeFromCart(item.id)}>
									Remove
								</button>
							</div>
						))}
						<div className={styles.total}>Total: ${total.toFixed(2)}</div>
					</div>
				)}
			</div>
		</div>
	);
}
