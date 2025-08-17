const Volunteer = require("../models/volunteerModels");
// const rules = require("../config/distributionsRules");
const activityDay = new Date().getDay();
activityDay === 0 || activityDay === 6 ? (act = 10) : (act = 13); // Import etmək lazım olan model

const distributeVolunteers = async (req, res) => {
  try {
    const activityDay = new Date().getDay();

    // Aktivit konfiqurasiyası
    const activities = {
      bagca: {
        type: "oturaqli",
        gender: ["qadın"],
        limit: 1,
        oncePerCycle: true,
      },
      sorgu: {
        type: "ayaqustu",
        gender: ["kişi", "qadın"],
        limit: 3,
        minGapForRepeat: 3,
      },
      yon2: {
        type: "ayaqustu",
        gender: ["kişi", "qadın"],
        limit: 2,
      },
      yon3: {
        type: "ayaqustu",
        gender: ["kişi", "qadın"],
        limit: 2,
      },
      vvaq: {
        type: "oturaqli",
        gender: ["kişi", "qadın"],
        limit: 2,
      },
    };

    // Random seçim funksiyası
    function getRandomSample(arr, size) {
      if (!arr || arr.length === 0) return [];
      return arr.sort(() => 0.5 - Math.random()).slice(0, size);
    }

    // Hər aktivit üçün könüllü seçimi
    const distributionResult = {};

    for (const [activityName, config] of Object.entries(activities)) {
      // Əsas filter
      let query = {
        role: { $nin: ["qrup rəhbəri", "sorğu rəhbəri", "digər"] },
      };

      // Gender filter
      if (config.gender.includes("qadın") && config.gender.includes("kişi")) {
        // Hər ikisi qəbul edilir, filter yoxdur
      } else if (config.gender.includes("qadın")) {
        query.gender = "qadın";
      } else if (config.gender.includes("kişi")) {
        query.gender = "kişi";
      }

      // OncePerCycle filter - əgər bu aktivitdə iştirak etməyibsə
      if (config.oncePerCycle) {
        query["activityHistory.activity"] = { $ne: activityName };
      }

      // MinGapForRepeat filter - son aktivitlərə bax
      if (config.minGapForRepeat) {
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - config.minGapForRepeat * 7); // həftələrlə hesabla

        query.$or = [
          { "activityHistory.activity": { $ne: activityName } }, // heç vaxt bu aktivitdə olmamış
          {
            activityHistory: {
              $not: {
                $elemMatch: {
                  activity: activityName,
                  date: { $gte: cutoffDate },
                },
              },
            },
          }, // son müddətdə bu aktivitdə olmamış
        ];
      }

      // Bütün uyğun könüllüləri tap
      // let bağçaVolunteers = [];
      // let sorğuVolunteers = [];
      // let yön2Volunteers = [];
      // let yön3Volunteers = [];
      // let vvaqVolunteers = [];
      let availableVolunteers = [];

      try {
        availableVolunteers = await Volunteer.find(query);

        // sorğuVolunteers = await Volunteer.find({
        //   "history.activity": { $ne: "sorğu" },
        // });

        // yön2Volunteers = await Volunteer.find({
        //   "history.activity": { $ne: "yön2" },
        // });

        // yön3Volunteers = await Volunteer.find({
        //   "history.activity": { $ne: "yön3" },
        // });

        // vvaqVolunteers = await Volunteer.find({
        //   "history.activity": { $ne: "vvaq" },

        // hamısını birləşdiririk
        // hamısını birləşdiririk
        // availableVolunteers: [
        //   ...bağçaVolunteers,
        //   ...sorğuVolunteers,
        //   ...yön2Volunteers,
        //   ...yön3Volunteers,
        //   ...vvaqVolunteers,
        // ],
      } catch (error) {
        console.error(`Error fetching volunteers for ${activityName}:`, error);
        availableVolunteers = [];
      }

      // Helper function – massivdən random seçmək
      function getRandomSample(arr, size) {
        return arr.sort(() => 0.5 - Math.random()).slice(0, size);
      }

      // Period 1 üçün seçilənlər
      const period1 = [
        ...getRandomSample(
          availableVolunteers.filter((v) => v.period === "1"),
          4
        ),
        // ),
        // ...getRandomSample(
        //   sorğuVolunteers.filter((v) => v.period === "1"),
        //   12
        // ),
        // ...getRandomSample(
        //   yön2Volunteers.filter((v) => v.period === "1"),
        //   8
        // ),
        // ...getRandomSample(
        //   yön3Volunteers.filter((v) => v.period === "1"),
        //   8
        // ),
        // ...getRandomSample(
        //   vvaqVolunteers.filter((v) => v.period === "1"),
        //   5
        // ),
      ];

      // Period 2 üçün seçilənlər
      const period2 = [
        ...getRandomSample(
          availableVolunteers.filter((v) => v.period === "2"),
          4
        ),
        // ...getRandomSample(
        //   sorğuVolunteers.filter((v) => v.period === "2"),
        //   12
        // ),
        // ...getRandomSample(
        //   yön2Volunteers.filter((v) => v.period === "2"),
        //   8
        // ),
        // ...getRandomSample(
        //   yön3Volunteers.filter((v) => v.period === "2"),
        //   8
        // ),
        // ...getRandomSample(
        //   vvaqVolunteers.filter((v) => v.period === "2"),
        //   5
        ,
      ];

      // Period 3 üçün seçilənlər
      const period3 = [
        ...getRandomSample(
          availableVolunteers.filter((v) => v.period === "3"),
          5
        ),
        // ...getRandomSample(
        //   sorğuVolunteers.filter((v) => v.period === "3"),
        //   15
        // ),
        // ...getRandomSample(
        //   yön2Volunteers.filter((v) => v.period === "3"),
        //   10
        // ),
        // ...getRandomSample(
        //   yön3Volunteers.filter((v) => v.period === "3"),
        //   10
        // ),
        // ...getRandomSample(
        //   vvaqVolunteers.filter((v) => v.period === "3"),
        //   5
        // ),
      ];

      const selected = [...period1, ...period2, ...period3];

      // Seçim strategiyası

      const totalLimit = config.limit;

      // Period 3-dən başla (ən çox aktivitlə)
      if (period3.length > 0 && selected.length < totalLimit) {
        const p3Count = Math.ceil(totalLimit * 0.4); // 40%
        selected.push(
          ...getRandomSample(
            period3,
            Math.min(p3Count, period3.length, totalLimit - selected.length)
          )
        );
      }

      // Period 2
      if (period2.length > 0 && selected.length < totalLimit) {
        const p2Count = Math.ceil(totalLimit * 0.3); // 30%
        selected.push(
          ...getRandomSample(
            period2,
            Math.min(p2Count, period2.length, totalLimit - selected.length)
          )
        );
      }

      // Period 1
      if (period1.length > 0 && selected.length < totalLimit) {
        const remaining = totalLimit - selected.length;
        selected.push(
          ...getRandomSample(period1, Math.min(remaining, period1.length))
        );
      }

      // Hələ də kifayət deyilsə, qalan bütün periodlardan seç
      if (selected.length < totalLimit) {
        const allRemaining = availableVolunteers.filter(
          (v) => !selected.some((s) => s._id.toString() === v._id.toString())
        );
        const stillNeeded = totalLimit - selected.length;
        selected.push(
          ...getRandomSample(
            allRemaining,
            Math.min(stillNeeded, allRemaining.length)
          )
        );
      }

      distributionResult[activityName] = {
        volunteers: selected,
        count: selected.length,
        required: config.limit,
        type: config.type,
        availablePool: availableVolunteers.length,
        periodBreakdown: {
          period1: period1.length,
          period2: period2.length,
          period3: period3.length,
        },
      };
    }

    // Ümumi statistika
    const totalSelected = Object.values(distributionResult).reduce(
      (sum, activity) => sum + activity.count,
      0
    );

    const totalRequired = Object.values(activities).reduce(
      (sum, config) => sum + config.limit,
      0
    );

    res.json({
      success: true,
      date: new Date().toISOString().split("T")[0],
      day: [
        "Bazar",
        "Bazar ertəsi",
        "Çərşənbə axşamı",
        "Çərşənbə",
        "Cümə axşamı",
        "Cümə",
        "Şənbə",
      ][activityDay],
      activities: distributionResult,
      summary: {
        totalActivities: Object.keys(activities).length,
        totalVolunteersSelected: totalSelected,
        totalRequiredVolunteers: totalRequired,
        fulfillmentRate: `${Math.round(
          (totalSelected / totalRequired) * 100
        )}%`,
      },
    });
  } catch (error) {
    console.error("Volunteer distribution error:", error);
    res.status(500).json({
      success: false,
      error: "Könüllü bölüşdürülməsində xəta baş verdi",
      details: error.message,
    });
  }
};

// Seçilmiş könüllülərin aktivit tarixçəsini yeniləmək üçün helper
const updateVolunteerActivity = async (volunteerId, activityName) => {
  try {
    await Volunteer.findByIdAndUpdate(volunteerId, {
      $push: {
        activityHistory: {
          activity: activityName,
          date: new Date(),
          status: "assigned",
        },
      },
    });
    return true;
  } catch (error) {
    console.error("Activity history update error:", error);
    return false;
  }
};

// Bütün seçilmiş könüllülərin tarixçəsini yeniləmək
const finalizeDistribution = async (req, res) => {
  try {
    const { distributionResult } = req.body;

    if (!distributionResult) {
      return res.status(400).json({
        success: false,
        error: "Distribution result məlumatı tələb olunur",
      });
    }

    let updateCount = 0;
    for (const [activityName, data] of Object.entries(distributionResult)) {
      if (data.volunteers && Array.isArray(data.volunteers)) {
        for (const volunteer of data.volunteers) {
          const updated = await updateVolunteerActivity(
            volunteer._id,
            activityName
          );
          if (updated) updateCount++;
        }
      }
    }

    res.json({
      success: true,
      message: "Aktivit tarixçəsi uğurla yeniləndi",
      updatedVolunteers: updateCount,
    });
  } catch (error) {
    console.error("Finalization error:", error);
    res.status(500).json({
      success: false,
      error: "Tarixçə yeniləmə zamanı xəta",
      details: error.message,
    });
  }
};

module.exports = {
  distributeVolunteers,
  updateVolunteerActivity,
  finalizeDistribution,
};
