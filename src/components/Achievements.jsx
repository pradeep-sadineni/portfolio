import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Fade from 'react-reveal';
import { Container } from 'react-bootstrap';
import Header from './Header';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';

const Achievement = ({ title, description, link }) => (
  <div>
    <h3>{title}</h3>
    <p>{description}</p>
    <a href={link} target="_blank" rel="noopener noreferrer">Link</a>
  </div>
);

const Achievements = ({ header }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.achievements, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <Header title={header} />
      {data ? (
        <Fade>
          <div className="section-content-container">
            <Container>
              {data.achievement.map((achievement) => (
                <Achievement
                  key={achievement.title}
                  title={achievement.title}
                  description={achievement.description}
                  link={achievement.link}
                />
              ))}
            </Container>
          </div>
        </Fade>
      ) : <FallbackSpinner />}
    </>
  );
};

Achievement.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

Achievements.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Achievements;
