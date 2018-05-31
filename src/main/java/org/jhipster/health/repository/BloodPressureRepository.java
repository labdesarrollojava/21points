package org.jhipster.health.repository;

import org.jhipster.health.domain.BloodPressure;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;

/**
 * Spring Data JPA repository for the BloodPressure entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BloodPressureRepository extends JpaRepository<BloodPressure, Long> {

    @Query("select blood_pressure from BloodPressure blood_pressure where blood_pressure.user.login = ?#{principal.username}")
    List<BloodPressure> findByUserIsCurrentUser();

    List<BloodPressure> findAllByTimestampBetweenOrderByTimestampDesc(
    		ZonedDateTime firstDate, ZonedDateTime secondDate);

	List<BloodPressure> findAllByTimestampBetweenAndUserLoginOrderByTimestampDesc(ZonedDateTime daysAgo,
            ZonedDateTime rightNow, Optional<String> currentUserLogin);

    List<BloodPressure> findAllByTimestampBetweenAndUserLoginOrderByTimestampDesc(ZonedDateTime firstDate,
            ZonedDateTime secondDate, String login);
}
