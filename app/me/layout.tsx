import React from 'react';

interface MyPageLayoutProps {
   children: React.ReactNode;
   modal: React.ReactNode;
}

const MyPageLayout = ({ children, modal }: MyPageLayoutProps) => {
	return (
		<>
			{modal}
			{children}
		</>
	);
};

export default MyPageLayout;