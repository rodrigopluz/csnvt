/* eslint-disable react/prop-types */

import React, { useEffect } from 'react';
import { IButtonsProps } from '@csnvt/types';

import dataPorts from '../helpers/dataPorts';

const Buttons: React.FC<IButtonsProps> = ({
  filterPort,
  menuFilter,
  setFilter,
}) => {
  const data = dataPorts;

  useEffect(() => {
    const filterBtn = document.querySelectorAll(
      '#portfolio-flters li',
    );

    filterBtn.forEach(btn => {
      btn.addEventListener('click', function () {
        filterBtn.forEach(btn =>
          btn.classList.remove('filter-active'),
        );
        this.classList.add('filter-active');
      });
    });
  }, []);

  return (
    <ul id="portfolio-flters">
      <li
        data-filter="*"
        className={`filter-active`}
        onClick={() => setFilter(data as any)}
      >
        All Ports
      </li>
      {menuFilter.map((port, id) => {
        return (
          <li
            key={id}
            className=""
            data-filter={`.${port.category}`}
            onClick={() => filterPort(port.category)}
          >
            {port.name}
          </li>
        );
      })}
    </ul>
  );
};

export default Buttons;
