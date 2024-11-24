import ButtonSpinner from '../ButtonSpinner/ButtonSpinner';
import React, { MouseEventHandler } from 'react';

interface Props {
  isLoading?: boolean;
  text: string;
  isDisabled?: boolean;
  type?: 'submit' | 'button';
  showModal?: MouseEventHandler<HTMLButtonElement>;
}

const ButtonLoading: React.FC<Props> = ({showModal, isLoading = false, text, type = 'submit', isDisabled = false}) => {
  return (
    <>
      <button onClick={showModal} disabled={isDisabled} type={type} className="btn btn-primary d-flex align-items-center">
        <span className='me-2'>{text}</span>
        {isLoading ? <ButtonSpinner/> : null}
      </button>
    </>
  );
};

export default ButtonLoading;