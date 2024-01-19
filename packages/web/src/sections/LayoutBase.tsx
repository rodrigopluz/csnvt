import React from 'react';
import { Link } from 'react-router-dom';

import { ILayoutBaseProps } from '@csnvt/types';
import { Environment } from '@csnvt/environment';

const LayoutBase: React.FC<ILayoutBaseProps> = ({
  rota,
  title,
  toolbar,
  children,
  subTitle,
  loggedUser,
}) => {
  return (
    <div
      className="col-12 py-3"
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      {toolbar && (
        <div
          className="col-2"
          style={{
            height: '100%',
            paddingRight: '30px',
            borderRight: '1px solid #e1e1e1',
          }}
        >
          {toolbar}
        </div>
      )}
      <div className="col-10 px-3">
        <div
          className="col-12"
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <h5 className="py-3 px-3">{title} </h5>
          {loggedUser.perfil == Environment.PROFILE_ADM &&
            title !== 'Dashboard' &&
            rota != undefined && (
              <>
                &raquo; &nbsp;
                <Link to={rota}>
                  <span className="">
                    Adicionar novo{' '}
                    {title.toLowerCase().slice(0, -1)}
                  </span>
                </Link>
              </>
            )}
          {subTitle && (
            <>
              &raquo; &nbsp;
              <span className="">{subTitle}</span>
            </>
          )}
        </div>
        {children}
      </div>
    </div>
  );
};

export default LayoutBase;
