import {useReducer} from 'react';
import {IconSet} from './IconSet';
import {IconText} from './IconText';

interface Props {
  type: 'left-right' | 'single' | 'right-left' | 'up-down';
  hover: boolean;
  className: string;
  override: JSX.Element;
}

export const Content = ({
  type,
  hover,
  className,
  override = (
    <IconText
      className="!flex-1 !flex !grow"
      textDirectionVerticalClassName="!flex-1  !grow"
      type="icon-text"
    />
  ),
}: Props): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, {
    type: type || 'single',
    hover: hover,
  });

  return (
    <div
      className={`flex rounded-[var(--radius-8)] relative ${
        ['single', 'up-down'].includes(state.type) ? 'w-[53px]' : 'w-[89px]'
      } ${
        ['left-right', 'right-left', 'single'].includes(state.type)
          ? 'flex-wrap'
          : ''
      } ${state.type === 'up-down' ? 'flex-col' : ''} ${
        state.type === 'up-down' ? 'items-start' : 'items-center'
      } ${
        state.type === 'up-down'
          ? 'gap-[8px]'
          : state.type === 'single'
          ? 'gap-[8px_8px]'
          : 'gap-[var(--spacing-16)]'
      } ${state.type === 'up-down' ? 'justify-center' : ''} ${
        state.hover ? 'bg-[color:var(--themes-black-5)]' : ''
      } ${className}`}
      onMouseLeave={() => {
        dispatch('mouse_leave');
      }}
      onMouseEnter={() => {
        dispatch('mouse_enter');
      }}>
      {state.type === 'right-left' && (
        <IconSet
          BG={false}
          badge={false}
          className="!flex-[0_0_auto]"
          size="twenty"
        />
      )}

      {['left-right', 'right-left', 'up-down'].includes(state.type) && (
        <IconText
          className={
            state.type === 'up-down'
              ? '!self-stretch !flex-[0_0_auto] !flex !w-full'
              : '!flex-1 !flex !grow'
          }
          textDirectionVerticalClassName="!flex-1  !grow"
          type="icon-text"
        />
      )}

      {state.type === 'single' && <>{override}</>}

      {['left-right', 'up-down'].includes(state.type) && (
        <IconSet
          BG={false}
          badge={false}
          className="!flex-[0_0_auto]"
          size="twenty"
        />
      )}
    </div>
  );
};

function reducer(state: {hover: boolean; type: string}, action: string) {
  if (state.hover === false && state.type === 'left-right') {
    switch (action) {
      case 'mouse_enter':
        return {
          hover: true,
          type: 'left-right',
        };
    }
  }

  if (state.hover === true && state.type === 'left-right') {
    switch (action) {
      case 'mouse_leave':
        return {
          hover: true,
          type: 'right-left',
        };
    }
  }

  if (state.hover === false && state.type === 'right-left') {
    switch (action) {
      case 'mouse_enter':
        return {
          hover: true,
          type: 'left-right',
        };
    }
  }

  if (state.hover === true && state.type === 'right-left') {
    switch (action) {
      case 'mouse_enter':
        return {
          hover: true,
          type: 'left-right',
        };
    }
  }

  if (state.hover === false && state.type === 'up-down') {
    switch (action) {
      case 'mouse_enter':
        return {
          hover: true,
          type: 'up-down',
        };
    }
  }

  if (state.hover === true && state.type === 'up-down') {
    switch (action) {
      case 'mouse_leave':
        return {
          hover: false,
          type: 'up-down',
        };
    }
  }

  if (state.hover === false && state.type === 'single') {
    switch (action) {
      case 'mouse_enter':
        return {
          hover: true,
          type: 'single',
        };
    }
  }

  if (state.hover === true && state.type === 'single') {
    switch (action) {
      case 'mouse_leave':
        return {
          hover: false,
          type: 'single',
        };
    }
  }

  return state;
}
