import RevokeModalUI from '@/components/mypage/RevokeModalUI';
import ModalBackdrop from '@/components/post/ModalBackdrop';
import React from 'react';

const RevokeModal = () => {
	return (
		<ModalBackdrop>
			<RevokeModalUI />
		</ModalBackdrop>
	);
};

export default RevokeModal;