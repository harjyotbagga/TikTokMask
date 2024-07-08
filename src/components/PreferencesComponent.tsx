import React, { useState } from 'react';
import {
  DocumentData,
} from "firebase/firestore";

interface ContentPreferences {
  enabled: boolean;
  subCategories: {
    [key: string]: boolean;
  };
}

interface PreferencesComponentProps {
    user: DocumentData,
    setProfileData: any;
}

interface Preferences {
  [key: string]: ContentPreferences;
}

const initialPreferences: Preferences = {
  politicalContent: {
    enabled: true,
    subCategories: {
      leftWing: false,
      rightWing: false,
      centrism: false,
      extremism: false,
      electionCoverage: false,
      politicalDebates: false,
    },
  },
  sexualityAndGenderIssues: {
    enabled: true,
    subCategories: {
      lgbtq: false,
      genderIdentity: false,
      sexualHealth: false,
      feminism: false,
      sexEducation: false,
      relationshipAdvice: false,
    },
  },
  offensiveContent: {
    enabled: true,
    subCategories: {
      profanity: false,
      graphicContent: false,
      disturbingImages: false,
      offensiveJokes: false,
      hateSpeech: false,
      insensitiveComments: false,
    },
  },
  religiousContent: {
    enabled: true,
    subCategories: {
      christianity: false,
      islam: false,
      hinduism: false,
      buddhism: false,
      atheism: false,
      interfaithDialogues: false,
    },
  },
  racialContent: {
    enabled: true,
    subCategories: {
      racialEquality: false,
      racialDiscrimination: false,
      culturalAppropriation: false,
      racialHistory: false,
      racistRemarks: false,
    },
  },
  hateSpeech: {
    enabled: true,
    subCategories: {
      racism: false,
      sexism: false,
      homophobia: false,
      transphobia: false,
      xenophobia: false,
      otherHateSpeech: false,
    },
  },
};

const PreferencesComponent: React.FC<PreferencesComponentProps> = ({user, setProfileData}) => {
  console.log(JSON.parse(user.jsonTag)) ;
  const [preferences, setPreferences] = useState(JSON.parse(user.jsonTag));

  const handleCategoryChange = (category: string) => {
    setPreferences((prevPreferences) => ({
      ...prevPreferences,
      [category]: {
        ...prevPreferences[category],
        enabled: !prevPreferences[category].enabled,
      },
    }));
  };

  const handleSubCategoryChange = (category: string, subCategory: string) => {
    setPreferences((prevPreferences) => ({
      ...prevPreferences,
      [category]: {
        ...prevPreferences[category],
        subCategories: {
          ...prevPreferences[category].subCategories,
          [subCategory]: !prevPreferences[category].subCategories[subCategory],
        },
      },
    }));
  };

  const handleSave = () => {
    // Save preferences in json
    console.log('Preferences saved:', JSON.stringify(preferences));

    // Send a patch request
    fetch(`https://firestore.googleapis.com/v1/projects/tiktok-proj-a3304/databases/(default)/documents/users/${user.userId}?updateMask.fieldPaths=jsonTag`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            fields: {
            jsonTag: {
                stringValue: JSON.stringify(preferences),
            },
            },
        }),
        }).then((res) => {
        console.log('Preferences saved:', res);
        }        
    )
    user.jsonTag = JSON.stringify(preferences);
    setProfileData(user);

  };

  return (
    <div className="bg-white dark:text-systemLbDark-400 dark:bg-systemGrayDark-200 flex flex-col w-full max-w-2xl mx-auto border dark:border-systemSepDark-sep items-center space-y-6 p-14 shadow-sm rounded-b-3xl ">
      {Object.keys(preferences).map((category) => (
        <div key={category} >
          <label>
            <input
              type="checkbox"
              checked={preferences[category].enabled}
              onChange={() => handleCategoryChange(category)}
              style={{ marginRight: '10px' }}
            />
            {category}
          </label>
          {preferences[category].enabled && (
            <div style={{ paddingLeft: '20px', textAlign: 'center', padding: '10px' }}>
              {Object.keys(preferences[category].subCategories).map((subCategory) => (
                <label key={subCategory} style={{ padding: '10px'}}>
                  <input
                    type="checkbox"
                    checked={preferences[category].subCategories[subCategory]}
                    onChange={() => handleSubCategoryChange(category, subCategory)}
                    style={{ marginRight: '10px' }}
                  />
                  {subCategory}<br />
                </label>
              ))}
            </div>
          )}
        </div>
      ))}
      <button onClick={handleSave}>Save Preferences</button>
    </div>
  );
};

export default PreferencesComponent;
