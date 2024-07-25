import LogoutModalUI from '@/components/mypage/LogoutModalUI';
import ModalBackdrop from '@/components/post/ModalBackdrop';
import React from 'react';

const LogoutModal = () => {
	return (
		<ModalBackdrop>
			<LogoutModalUI />
		</ModalBackdrop>
	);
};

export default LogoutModal;